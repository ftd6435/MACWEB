<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class BrandedOutboundMessage extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public int $tries = 5;

    public array $backoff = [10, 30, 120];

    public function __construct(
        public string $subjectLine,
        public string $bodyText,
        public string $companyName,
        public ?string $logoUrl = null,
        public ?string $heading = null,
        public ?string $replyToEmail = null,
        public ?string $replyToName = null,
    ) {}

    public function build()
    {
        $accent = '#00B8D4';
        $dark = '#212121';
        $muted = '#616161';
        $border = '#E2E8F0';
        $bg = '#F8FAFC';
        $url = (string) config('app.url', '');

        $brandBlock = $this->logoUrl
            ? '<img src="' . e($this->logoUrl) . '" alt="' . e($this->companyName) . '" style="display:block; max-width:180px; height:auto; border:0; outline:none; text-decoration:none;" />'
            : '<div style="font-family: Arial, sans-serif; font-weight:900; color:' . $dark . '; font-size:16px; letter-spacing:0.4px;">' . e($this->companyName) . '</div>';

        $heading = $this->heading ?: $this->subjectLine;
        $preheader = mb_substr(trim(preg_replace('/\s+/', ' ', $this->bodyText)), 0, 120);
        $bodyHtml = nl2br(e($this->bodyText));
        $replyHint = $this->replyToEmail
            ? '<div style="margin-top:18px; padding:14px 16px; background:' . $bg . '; border:1px solid #F1F5F9; border-radius:16px; font-family: Arial, sans-serif; font-size:12px; color:' . $muted . '; line-height:1.7;">'
            . '<strong style="color:' . $dark . ';">Réponse rapide :</strong> répondez directement à cet email pour contacter '
            . e($this->replyToName ?: $this->replyToEmail) . '.'
            . '</div>'
            : '';

        $html =
            '<div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">'
            . e($preheader)
            . '</div>'
            . '<div style="background:' . $bg . '; padding:28px 12px;">'
            . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px; margin:0 auto; border-collapse:collapse;">'
            . '<tr><td style="padding: 0 0 14px;">'
            . $brandBlock
            . '</td></tr>'
            . '<tr><td style="background:#ffffff; border:1px solid ' . $border . '; border-radius:28px; overflow:hidden;">'
            . '<div style="height:4px; background:' . $accent . '; line-height:4px;">&nbsp;</div>'
            . '<div style="padding:26px 26px 22px;">'
            . '<div style="font-family: Arial, sans-serif; font-size:20px; font-weight:900; color:' . $dark . '; margin:0 0 10px;">'
            . e($heading)
            . '</div>'
            . '<div style="font-family: Arial, sans-serif; font-size:14px; color:' . $muted . '; line-height:1.9;">'
            . $bodyHtml
            . '</div>'
            . $replyHint
            . '</div>'
            . '</td></tr>'
            . '<tr><td style="padding:16px 6px; font-family: Arial, sans-serif; font-size:11px; color:#9E9E9E; text-align:center; line-height:1.6;">'
            . e($this->companyName)
            . ($url ? ' — <a href="' . e($url) . '" style="color:' . $accent . '; text-decoration:none;">' . e($url) . '</a>' : '')
            . '</td></tr>'
            . '</table>'
            . '</div>';

        $m = $this->subject($this->subjectLine)->html($html);
        if ($this->replyToEmail) {
            $m->replyTo($this->replyToEmail, $this->replyToName ?: $this->companyName);
        }

        return $m;
    }
}
