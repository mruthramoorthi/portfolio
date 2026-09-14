#!/usr/bin/env python3
"""
RUDRA CYBER-CORE PORTFOLIO SERVER
Serves static files and handles live SMTP contact form transmissions.
"""

import os
import sys
import json
import smtplib
from http.server import HTTPServer, SimpleHTTPRequestHandler
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formatdate
from urllib.parse import parse_qs

def _load_env_file():
    env_path = os.path.join(DIRECTORY, ".env")
    if os.path.exists(env_path):
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))

_load_env_file()

PORT = int(os.getenv("PORT", 8080))
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 465))
SMTP_USER = os.getenv("SMTP_USER", "mruthramoorthi66@gmail.com")
SMTP_PASS = os.getenv("SMTP_PASS", "efoxztpwulfaifxa")
RECIPIENT_EMAIL = os.getenv("RECIPIENT_EMAIL", "mruthramoorthi66@gmail.com")

def send_contact_email(name, sender_email, phone, hosting_tier, message_content):
    """Sends contact form email using Gmail SMTP SSL."""
    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"⚡ [New Client Lead] {name} - Portfolio Inquiry"
        msg['From'] = f"\"Portfolio Uplink\" <{SMTP_USER}>"
        msg['To'] = RECIPIENT_EMAIL
        msg['Reply-To'] = sender_email
        msg['Date'] = formatdate(localtime=True)

        tier_labels = {
            "highend": "High-End Cloud Enterprise (AWS / Google Cloud)",
            "lowend": "Budget-Optimized Lean VPS (Low Monthly Overhead)",
            "hybrid": "Mid-Tier Dedicated / Hybrid Node",
            "custom_erp": "Custom Business ERP & Logic Automation",
            "consult": "Architectural Guidance / Diagnostic"
        }
        tier_display = tier_labels.get(hosting_tier, hosting_tier)

        plain_text = f"""
==================================================
⚡ NEW CLIENT INQUIRY - RUDRA CYBER PORTFOLIO
==================================================

Client Name:    {name}
Client Email:   {sender_email}
Client Mobile:  {phone}
Hosting Tier:   {tier_display}

Problem Statement / Project Scope:
--------------------------------------------------
{message_content}
--------------------------------------------------

* Reply directly to this email to respond to {name} ({sender_email}).
"""

        html_content = f"""
<!DOCTYPE html>
<html>
<head>
  <style>
    body {{ font-family: 'Segoe UI', Arial, sans-serif; background-color: #0d0805; color: #f4ede4; margin: 0; padding: 24px; }}
    .card {{ background-color: #1a110b; border: 1px solid #f59e0b; border-radius: 10px; max-width: 600px; margin: 0 auto; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.6); }}
    .header {{ background: linear-gradient(135deg, #ff3700 0%, #ff8c00 100%); color: #ffffff; padding: 20px 24px; font-weight: bold; font-size: 18px; letter-spacing: 0.5px; }}
    .content {{ padding: 24px; }}
    .field {{ margin-bottom: 16px; border-bottom: 1px dashed #332115; padding-bottom: 12px; }}
    .label {{ color: #ff8400; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; margin-bottom: 4px; display: block; }}
    .value {{ font-size: 15px; color: #ffffff; font-weight: 500; }}
    .value a {{ color: #fbbf24; text-decoration: none; }}
    .message-box {{ background-color: #120c08; border-left: 3px solid #ff5e00; padding: 14px 18px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #f5f5f5; white-space: pre-wrap; }}
    .footer {{ background-color: #0a0604; padding: 14px 24px; font-size: 12px; color: #8c7b6d; text-align: center; border-top: 1px solid #26170e; }}
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      ⚡ NEW CLIENT INQUIRY TRANSMITTED
    </div>
    <div class="content">
      <div class="field">
        <span class="label">CLIENT / COMPANY NAME</span>
        <span class="value">{name}</span>
      </div>
      <div class="field">
        <span class="label">REPLY-TO EMAIL</span>
        <span class="value"><a href="mailto:{sender_email}">{sender_email}</a></span>
      </div>
      <div class="field">
        <span class="label">MOBILE / PHONE NUMBER</span>
        <span class="value"><a href="tel:{phone}">{phone}</a></span>
      </div>
      <div class="field">
        <span class="label">TARGETED HOSTING / SERVICE TIER</span>
        <span class="value" style="color: #fbbf24;">{tier_display}</span>
      </div>
      <div class="field" style="border-bottom: none;">
        <span class="label">PROBLEM STATEMENT &amp; SCOPE</span>
        <div class="message-box">{message_content}</div>
      </div>
    </div>
    <div class="footer">
      Rudra Portfolio System &bull; Direct Reply Enabled
    </div>
  </div>
</body>
</html>
"""
        msg.attach(MIMEText(plain_text, 'plain'))
        msg.attach(MIMEText(html_content, 'html'))

        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=12) as server:
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, [RECIPIENT_EMAIL], msg.as_string())

        return True, None
    except Exception as e:
        return False, str(e)


class PortfolioHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        if self.path in ['/api/contact', '/api/contact/', '/send_mail.php']:
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length).decode('utf-8')
            
            try:
                data = json.loads(post_data)
            except Exception:
                parsed = parse_qs(post_data)
                data = {k: v[0] for k, v in parsed.items()}

            name = data.get('name', '').strip() or 'Anonymous Client'
            email = data.get('email', '').strip() or 'No Email'
            phone = data.get('phone', '').strip() or 'Not Provided'
            tier = data.get('hosting_tier', '').strip() or 'General Consultation'
            message = data.get('message', '').strip() or 'No message text provided.'

            success, err = send_contact_email(name, email, phone, tier, message)

            self.send_response(200 if success else 500)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()

            response_payload = {
                "success": success,
                "message": "Email transmitted successfully to Rudra!" if success else f"SMTP Transmission failed: {err}"
            }
            self.wfile.write(json.dumps(response_payload).encode('utf-8'))
        else:
            self.send_error(404, "Endpoint not found")


if __name__ == '__main__':
    server_address = ('', PORT)
    httpd = HTTPServer(server_address, PortfolioHandler)
    print(f"[*] Rudra Cyber Portfolio Server active at http://localhost:{PORT}/")
    print(f"[*] SMTP Uplink configured to {SMTP_USER} via {SMTP_HOST}:{SMTP_PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.server_close()
        print("\n[!] Server stopped.")
