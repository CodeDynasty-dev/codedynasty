<docmach type="wrapper" file="fragments/post-structure.html" replacement="content" params="
author:Friday Candour;
author_title: Software Developer;
time_created: Apr 1 2025;
time_to_read: 8 min;
title: How to Actually *Send* Emails from Your Custom Domain for free;
topic: Community;
author_img: https://avatars.githubusercontent.com/u/75016347;
image: /placeholder.png;
" >

<docmach type="function" params="tags: innovation, development, community, future-tech, ai" file="fragments/tags.js" />

### How to Actually *Send* Emails from Your Custom Domain for free

So you’ve set up Cloudflare Email Routing to forward emails to your personal Gmail. Sweet. But now you want to *send* emails from that fancy custom address (like `me@mydomain.com`) instead of just receiving them.

Here’s the deal: Cloudflare Email Routing is receive-only. To send, you need to plug into an external SMTP server. Gmail’s is the easiest option. Here’s how to do it.

---

### Step 1: Turn On 2FA and Grab an App Password

You can’t use your regular Gmail password for this. You need an **app password**.

1.  **Enable 2-Factor Authentication (2FA)** on your Google account if you haven’t already. Google requires this for app passwords.
2.  Go to your [Google Account Security settings](https://myaccount.google.com/security), find **“App passwords”**, and generate a new one.
3.  Select `Mail` as the app and give it a name like “Cloudflare Email”.
4.  **Copy that 16-character password**. You’ll need it in a minute.

---

### Step 2: Hook Up Your Custom Address in Gmail

Now, we tell Gmail it’s allowed to send mail from your custom domain.

1.  In Gmail, go to **Settings > See all settings > Accounts and Import**.
2.  Under **“Send mail as”**, click **“Add another email address”**.
3.  In the popup, enter your name and your full custom email address (e.g., `hello@yourdomain.com`).
4.  **Uncheck “Treat as an alias”** (this is important). Click **Next Step**.

---

### Step 3: Enter the SMTP Details

This is where you connect Gmail to itself, but for sending.

*   **SMTP Server:** `smtp.gmail.com`
*   **Port:** `587`
*   **Username:** Your full, original Gmail address (e.g., `yourpersonal@gmail.com`)
*   **Password:** The 16-character app password you just generated
*   **Secured connection:** Leave **TLS** selected.

Click **Add Account**.

---

### Step 4: Verify It’s Really You

Gmail will send a verification code to your custom address. Thanks to Cloudflare, that email will be forwarded right back to your main Gmail inbox.

Find the email, grab the code, and confirm it in the popup. Done.

---

### How to Actually Send an Email

Now, when you compose a new email in Gmail, click on the **“From”** field. You’ll see your custom address as an option. Select it and send mail like a boss.

When you reply to an email that was sent to your custom address, Gmail should automatically use it as the sender.

---

### ⚠️ Super Important: Update Your SPF Record

If you don’t do this, your emails might get marked as spam. You need to tell the world that Gmail is authorized to send email on behalf of your domain.

1.  Go to your Cloudflare dashboard > **DNS**.
2.  Find your existing SPF record (a `TXT` record for `@`). If you don’t have one, create a new `TXT` record for `@`.
3.  Edit the **Content** (aka value) of the record to include Gmail’s servers:

```
v=spf1 include:_spf.mx.cloudflare.net include:_spf.google.com ~all
```

If you already have an SPF record, just slap `include:_spf.google.com` in there before the `~all`.

Save it. You’re now properly authenticated.

---

### Bonus: Getting Your Logo to Show in Gmail

By default, your sent emails might just show a generic “G” logo. To get your custom image to show:

1.  Open an **Incognito/Private browser window**.
2.  Go to [accounts.google.com](https://accounts.google.com) and click **“Create account”**.
3.  Choose **“Use my current email address instead”** and enter your custom Cloudflare email address (e.g., `hello@yourdomain.com`).
4.  Complete the sign-up process. You’ll get a verification email to that address (which, again, forwards to your main Gmail—so you can confirm it).
5.  Once the account is created, go to your [Google Profile](https://myaccount.google.com/profile), upload a profile picture, and set its visibility to **“Public”** or **“Visible to everyone”**.

Emails you send from your custom address should now show that image.

---

### What About Sending a Ton of Emails?

Don’t. Just don’t.

This Gmail SMTP setup is perfect for personal use or low-volume business correspondence. It is **NOT** for newsletters, marketing blasts, or transactional emails.

Gmail has strict limits (~500 emails per day), and hitting them can get your account suspended. For bulk sending, use a service built for it like **Mailgun**, **SendGrid**, or **Amazon SES**.

---

### Cool Stuff You Might Have Missed

*   **Catch-All Address:** In Cloudflare Email Routing, you can set up a rule to catch *any* email sent to your domain (`*@yourdomain.com`) and route it to your inbox. Great for signing up for services without creating a new address first.
*   **Email Workers:** For the coders, you can use Cloudflare Workers to write custom logic for processing inbound emails—like filtering spam or forwarding to multiple addresses based on rules.
*   **Go Beyond SPF:** For max security and deliverability, look into setting up **DKIM** and **DMARC** records. This is the pro move for making sure your emails are trusted everywhere.

That’s it. You’re now fully set up to send and receive from your custom domain, for free, using Cloudflare and Gmail.
</docmach>
