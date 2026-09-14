<?php
/**
 * Rudra Cyber Portfolio - PHP SMTP Mail Handler (for XAMPP Apache)
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    $data = $_POST;
}

$name = isset($data['name']) ? trim($data['name']) : 'Anonymous Client';
$email = isset($data['email']) ? trim($data['email']) : 'No Email';
$phone = isset($data['phone']) ? trim($data['phone']) : 'Not Provided';
$hostingTier = isset($data['hosting_tier']) ? trim($data['hosting_tier']) : 'General Consultation';
$message = isset($data['message']) ? trim($data['message']) : 'No message text provided.';

$smtpHost = 'ssl://smtp.gmail.com';
$smtpPort = 465;
$smtpUser = 'mruthramoorthi66@gmail.com';
$smtpPass = 'efoxztpwulfaifxa';
$recipient = 'mruthramoorthi66@gmail.com';

function sendSmtpSsl($host, $port, $user, $pass, $to, $fromEmail, $fromName, $subject, $body) {
    $socket = fsockopen($host, $port, $errno, $errstr, 15);
    if (!$socket) {
        return "Socket connection failed: $errstr ($errno)";
    }

    $response = fgets($socket, 515);

    fputs($socket, "EHLO localhost\r\n");
    $response = '';
    while ($line = fgets($socket, 515)) {
        $response .= $line;
        if (substr($line, 3, 1) === ' ') break;
    }

    fputs($socket, "AUTH LOGIN\r\n");
    $response = fgets($socket, 515);

    fputs($socket, base64_encode($user) . "\r\n");
    $response = fgets($socket, 515);

    fputs($socket, base64_encode($pass) . "\r\n");
    $response = fgets($socket, 515);
    if (strpos($response, '235') === false) {
        fclose($socket);
        return "Authentication failed: $response";
    }

    fputs($socket, "MAIL FROM: <$user>\r\n");
    $response = fgets($socket, 515);

    fputs($socket, "RCPT TO: <$to>\r\n");
    $response = fgets($socket, 515);

    fputs($socket, "DATA\r\n");
    $response = fgets($socket, 515);

    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: Portfolio Uplink <$user>\r\n";
    $headers .= "Reply-To: $fromName <$fromEmail>\r\n";
    $headers .= "To: $to\r\n";
    $headers .= "Subject: $subject\r\n";
    $headers .= "Date: " . date("r") . "\r\n";

    $emailData = $headers . "\r\n" . $body . "\r\n.\r\n";
    fputs($socket, $emailData);
    $response = fgets($socket, 515);

    fputs($socket, "QUIT\r\n");
    fclose($socket);

    return true;
}

$subject = "⚡ [New Client Lead] $name - Portfolio Inquiry";
$htmlBody = "
<div style='background-color:#0d0805; color:#f4ede4; padding:20px; font-family:sans-serif;'>
  <div style='background-color:#1a110b; border:1px solid #f59e0b; padding:20px; border-radius:8px; max-width:600px; margin:auto;'>
    <h2 style='color:#ff8c00; margin-top:0;'>⚡ NEW CLIENT INQUIRY TRANSMITTED</h2>
    <p><strong>Client Name:</strong> " . htmlspecialchars($name) . "</p>
    <p><strong>Email:</strong> <a href='mailto:" . htmlspecialchars($email) . "' style='color:#fbbf24;'>" . htmlspecialchars($email) . "</a></p>
    <p><strong>Mobile / Phone:</strong> <a href='tel:" . htmlspecialchars($phone) . "' style='color:#fbbf24;'>" . htmlspecialchars($phone) . "</a></p>
    <p><strong>Targeted Hosting / Service:</strong> " . htmlspecialchars($hostingTier) . "</p>
    <hr style='border:none; border-top:1px dashed #332115;'>
    <p><strong>Problem Statement & Scope:</strong></p>
    <div style='background-color:#120c08; border-left:3px solid #ff5e00; padding:12px; border-radius:4px; white-space:pre-wrap;'>" . htmlspecialchars($message) . "</div>
    <p style='font-size:12px; color:#8c7b6d; margin-top:20px;'>Rudra Portfolio &bull; Direct Reply Enabled</p>
  </div>
</div>
";

$res = sendSmtpSsl($smtpHost, $smtpPort, $smtpUser, $smtpPass, $recipient, $email, $name, $subject, $htmlBody);

if ($res === true) {
    echo json_encode(['success' => true, 'message' => 'Email transmitted successfully!']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => "SMTP Error: $res"]);
}
