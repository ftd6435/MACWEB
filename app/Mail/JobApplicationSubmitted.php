<?php

namespace App\Mail;

use App\Models\JobApplication;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class JobApplicationSubmitted extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public int $tries = 5;

    public array $backoff = [10, 30, 120];

    public function __construct(
        public JobApplication $application,
        public ?string $adminUrl = null,
        public ?string $logoUrl = null,
        public ?string $companyName = null,
    ) {
        $this->application->loadMissing('jobListing');
    }

    public function build()
    {
        $accent = '#00B8D4';
        $dark = '#212121';
        $muted = '#616161';

        $jobTitle = $this->application->jobListing?->title
            ?? $this->application->position
            ?? 'Candidature spontanée';

        $subject = 'Nouvelle candidature — ' . $jobTitle;
        $adminUrl = $this->adminUrl;

        $messageBlock = '';
        if ($this->application->cover_letter) {
            $messageBlock =
                '<tr>'
                . '<td style="padding: 0 0 18px;">'
                . '<div style="font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:#9E9E9E; font-weight:700; margin:0 0 8px;">Message</div>'
                . '<div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:16px; padding:16px; color:' . $dark . '; font-size:14px; line-height:1.6;">'
                . nl2br(e($this->application->cover_letter))
                . '</div>'
                . '</td>'
                . '</tr>';
        }

        $ctaBlock = '';
        if ($adminUrl) {
            $ctaBlock =
                '<tr>'
                . '<td style="padding: 0 0 6px;">'
                . '<a href="' . e($adminUrl) . '" '
                . 'style="display:inline-block; background:' . $accent . '; color:#ffffff; text-decoration:none; font-weight:800; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; padding:14px 18px; border-radius:14px;">'
                . 'Ouvrir le backoffice'
                . '</a>'
                . '</td>'
                . '</tr>'
                . '<tr><td style="padding:0 0 20px; color:' . $muted . '; font-size:12px;">'
                . 'Vous pouvez traiter la candidature et télécharger le CV depuis l’espace admin.'
                . '</td></tr>';
        } else {
            $ctaBlock =
                '<tr><td style="padding:0 0 20px; color:' . $muted . '; font-size:12px;">'
                . 'Vous pouvez traiter la candidature et télécharger le CV depuis l’espace admin (Demandes).'
                . '</td></tr>';
        }

        $brandName = $this->companyName ?: config('app.name', 'MAC');
        $brandBlock = $this->logoUrl
            ? '<img src="' . e($this->logoUrl) . '" alt="' . e($brandName) . '" style="display:block; max-width:180px; height:auto; border:0; outline:none; text-decoration:none;" />'
            : '<div style="font-family: Arial, sans-serif; font-weight:900; color:' . $dark . '; font-size:16px; letter-spacing:0.4px;">' . e($brandName) . '</div>';

        $html =
            '<div style="background:#F8FAFC; padding:24px 12px;">'
            . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px; margin:0 auto; border-collapse:collapse;">'
            . '<tr><td style="padding: 0 0 14px;">'
            . $brandBlock
            . '</td></tr>'
            . '<tr><td style="background:#ffffff; border:1px solid #F1F5F9; border-radius:24px; padding:24px;">'
            . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">'
            . '<tr>'
            . '<td style="padding:0 0 6px; font-family: Arial, sans-serif; font-size:20px; font-weight:900; color:' . $dark . ';">Nouvelle candidature reçue</td>'
            . '</tr>'
            . '<tr>'
            . '<td style="padding:0 0 18px; font-family: Arial, sans-serif; font-size:14px; color:' . $muted . '; line-height:1.6;">'
            . 'Une nouvelle candidature vient d’être soumise sur le site.'
            . '</td>'
            . '</tr>'
            . '<tr><td style="padding:0 0 18px;">'
            . '<div style="background:#ffffff; border:1px solid #E2E8F0; border-radius:18px; overflow:hidden;">'
            . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">'
            . '<tr>'
            . '<td style="padding:12px 14px; background:#FFFFFF; border-bottom:1px solid #E2E8F0;">'
            . '<div style="font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:#9E9E9E; font-weight:700; margin:0 0 4px;">Poste</div>'
            . '<div style="font-size:14px; font-weight:900; color:' . $dark . ';">' . e($jobTitle) . '</div>'
            . '</td>'
            . '</tr>'
            . '<tr>'
            . '<td style="padding:12px 14px; border-bottom:1px solid #E2E8F0;">'
            . '<div style="font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:#9E9E9E; font-weight:700; margin:0 0 4px;">Candidat</div>'
            . '<div style="font-size:14px; font-weight:900; color:' . $dark . ';">' . e($this->application->name) . '</div>'
            . '</td>'
            . '</tr>'
            . '<tr>'
            . '<td style="padding:12px 14px; border-bottom:1px solid #E2E8F0;">'
            . '<div style="font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:#9E9E9E; font-weight:700; margin:0 0 4px;">Email</div>'
            . '<div style="font-size:14px; font-weight:900; color:' . $dark . ';">' . e($this->application->email) . '</div>'
            . '</td>'
            . '</tr>'
            . '<tr>'
            . '<td style="padding:12px 14px;">'
            . '<div style="font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:#9E9E9E; font-weight:700; margin:0 0 4px;">Téléphone</div>'
            . '<div style="font-size:14px; font-weight:900; color:' . $dark . ';">' . e($this->application->phone ?: '—') . '</div>'
            . '</td>'
            . '</tr>'
            . '</table>'
            . '</div>'
            . '</td></tr>'
            . $messageBlock
            . $ctaBlock
            . '<tr>'
            . '<td style="padding: 0; font-family: Arial, sans-serif; font-size:11px; color:#9E9E9E; line-height:1.6;">'
            . 'Cet email a été envoyé automatiquement.'
            . '</td>'
            . '</tr>'
            . '</table>'
            . '</td></tr>'
            . '<tr><td style="padding:14px 6px; font-family: Arial, sans-serif; font-size:11px; color:#9E9E9E; text-align:center;">'
            . e($brandName) . ' — ' . e(config('app.url', ''))
            . '</td></tr>'
            . '</table>'
            . '</div>';

        return $this->subject($subject)
            ->replyTo($this->application->email, $this->application->name)
            ->html($html);
    }
}
