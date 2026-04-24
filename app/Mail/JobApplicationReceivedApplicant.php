<?php

namespace App\Mail;

use App\Models\JobApplication;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class JobApplicationReceivedApplicant extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public int $tries = 5;

    public array $backoff = [10, 30, 120];

    public function __construct(
        public JobApplication $application,
        public string $companyName,
        public ?string $hrEmail = null,
        public ?string $logoUrl = null,
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

        $subject = 'Votre candidature a bien été reçue — ' . $this->companyName;

        $contactLine = $this->hrEmail
            ? 'Si vous souhaitez compléter votre dossier, vous pouvez nous écrire à <a href="mailto:' . e($this->hrEmail) . '" style="color:' . $accent . '; text-decoration:none; font-weight:800;">' . e($this->hrEmail) . '</a>.'
            : '';

        $html =
            '<div style="background:#F8FAFC; padding:24px 12px;">'
            . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px; margin:0 auto; border-collapse:collapse;">'
            . '<tr><td style="padding: 0 0 14px;">'
            . ($this->logoUrl
                ? '<img src="' . e($this->logoUrl) . '" alt="' . e($this->companyName) . '" style="display:block; max-width:180px; height:auto; border:0; outline:none; text-decoration:none;" />'
                : '<div style="font-family: Arial, sans-serif; font-weight:900; color:' . $dark . '; font-size:16px; letter-spacing:0.4px;">' . e($this->companyName) . '</div>')
            . '</td></tr>'
            . '<tr><td style="background:#ffffff; border:1px solid #F1F5F9; border-radius:24px; padding:24px;">'
            . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">'
            . '<tr>'
            . '<td style="padding:0 0 8px; font-family: Arial, sans-serif; font-size:20px; font-weight:900; color:' . $dark . ';">'
            . 'Nous avons bien reçu votre candidature'
            . '</td>'
            . '</tr>'
            . '<tr>'
            . '<td style="padding:0 0 18px; font-family: Arial, sans-serif; font-size:14px; color:' . $muted . '; line-height:1.8;">'
            . 'Bonjour ' . e($this->application->name) . ',<br/>'
            . 'Merci pour votre candidature. Nous confirmons la bonne réception de votre dossier et notre équipe l’examinera attentivement.'
            . '</td>'
            . '</tr>'
            . '<tr><td style="padding:0 0 18px;">'
            . '<div style="background:#ffffff; border:1px solid #E2E8F0; border-radius:18px; overflow:hidden;">'
            . '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">'
            . '<tr>'
            . '<td style="padding:12px 14px; border-bottom:1px solid #E2E8F0;">'
            . '<div style="font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:#9E9E9E; font-weight:700; margin:0 0 4px;">Poste</div>'
            . '<div style="font-size:14px; font-weight:900; color:' . $dark . ';">' . e($jobTitle) . '</div>'
            . '</td>'
            . '</tr>'
            . '<tr>'
            . '<td style="padding:12px 14px;">'
            . '<div style="font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:#9E9E9E; font-weight:700; margin:0 0 4px;">Email</div>'
            . '<div style="font-size:14px; font-weight:900; color:' . $dark . ';">' . e($this->application->email) . '</div>'
            . '</td>'
            . '</tr>'
            . '</table>'
            . '</div>'
            . '</td></tr>'
            . '<tr>'
            . '<td style="padding:0 0 18px; font-family: Arial, sans-serif; font-size:14px; color:' . $muted . '; line-height:1.8;">'
            . 'Si votre profil correspond à nos besoins, nous vous contacterons pour la suite du processus (entretien, tests, etc.).'
            . '</td>'
            . '</tr>'
            . ($contactLine
                ? '<tr><td style="padding:0 0 18px; font-family: Arial, sans-serif; font-size:14px; color:' . $muted . '; line-height:1.8;">' . $contactLine . '</td></tr>'
                : '')
            . '<tr>'
            . '<td style="padding: 0 0 6px;">'
            . '<div style="display:inline-block; background:' . $accent . '; color:#ffffff; font-weight:900; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; padding:12px 16px; border-radius:14px;">'
            . 'Merci pour votre confiance'
            . '</div>'
            . '</td>'
            . '</tr>'
            . '<tr>'
            . '<td style="padding: 14px 0 0; font-family: Arial, sans-serif; font-size:11px; color:#9E9E9E; line-height:1.6;">'
            . 'Cet email est un accusé de réception automatique. Merci de ne pas répondre à ce message.'
            . '</td>'
            . '</tr>'
            . '</table>'
            . '</td></tr>'
            . '<tr><td style="padding:14px 6px; font-family: Arial, sans-serif; font-size:11px; color:#9E9E9E; text-align:center;">'
            . e($this->companyName) . ' — ' . e(config('app.url', ''))
            . '</td></tr>'
            . '</table>'
            . '</div>';

        $mail = $this->subject($subject)->html($html);
        if ($this->hrEmail) {
            $mail->replyTo($this->hrEmail, $this->companyName);
        }
        return $mail;
    }
}
