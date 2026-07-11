# John Dewey H.S. School Website

Static, mobile-responsive website. Warm brown + gold, school logo and favicon,
exact Google Maps location. Deployed on GitHub Pages.

## Deploy (one command)
    powershell -ExecutionPolicy Bypass -File deploy.ps1

## Staff Portal
/admin.html - Applications review, Events, Notices, Scrapbook (multi-file
student project uploads, any file type), Gallery (image uploads), Parents
Voice. Login: johndewey06@gmail.com / johndewey2026@

## PUBLISHING content to all devices
Admin edits are saved in that browser only. To make them visible to everyone:
1. In the Staff Portal press EXPORT - it downloads content.json
2. Put content.json in this website folder (replace the old one)
3. Run deploy.ps1
Now every visitor and device sees the published events, projects, gallery
photos and testimonials. (Applications are received per-device only.)

## Student projects
Upload all project files together in the Scrapbook tab.
- HTML projects open inside the site with linked CSS, JS and images working.
- Python and JavaScript projects RUN automatically when opened (terminal
  output, input() prompts, ANSI colours). View Code is optional.

## Photos
See IMAGES-GUIDE.md to replace placeholder photos.
