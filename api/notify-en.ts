export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST is allowed' });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Brevo API key missing' });
  }

  const { typ, data } = req.body;

  try {
    // 1. MEMBERSHIP APPLICATION (ENGLISH)
    if (typ === 'MEDLEM') {
      const { fornamn, efternamn, epost, telefon, ort, engagemang } = data;

      // Confirmation to the member
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'Motbild', email: 'support@motbild.se' },
          to: [{ email: epost, name: `${fornamn} ${efternamn}` }],
          subject: 'Confirmation: Your membership application to Motbild',
          htmlContent: `
            <div style="font-family: serif; color: #090023; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #090023;">Thank you for your membership application, ${fornamn}!</h2>
              <p>We hereby confirm that we have received your details and your acceptance of the bylaws of Motbild – Biblical Unitarian Network.</p>
              <p>The association’s board is reviewing your application and we will get back to you shortly.</p>
              <br/>
              <p style="font-size: 13px; color: #555;">Kind regards,<br/><strong>Motbild</strong><br/>support@motbild.se</p>
            </div>
          `,
        }),
      });

      // Notis till Peter / Support
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'Motbild System', email: 'support@motbild.se' },
          to: [{ email: 'support@motbild.se', name: 'Motbild Admin' }],
          subject: `🔔 Ny medlemsansökan (EN): ${fornamn} ${efternamn} (${ort})`,
          htmlContent: `
            <div style="font-family: sans-serif; color: #090023;">
              <h3>Ny medlemsansökan har inkommit (Engelska sidan)</h3>
              <p><strong>Namn:</strong> ${fornamn} ${efternamn}</p>
              <p><strong>E-post:</strong> ${epost}</p>
              <p><strong>Telefon:</strong> ${telefon}</p>
              <p><strong>Ort:</strong> ${ort}</p>
              <p><strong>Önskat engagemang:</strong> ${engagemang?.join(', ') || 'Ej specificerat'}</p>
            </div>
          `,
        }),
      });

      return res.status(200).json({ success: true });
    }

    // 2. CO-HOST INQUIRY FROM HOST CHURCH (ENGLISH)
    if (typ === 'MEDARRANGOR') {
      const { fornamn, efternamn, epost, telefon, forsamling, ort, roll, samfund } = data;

      // Confirmation to the church
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'Motbild Debate', email: 'support@motbild.se' },
          to: [{ email: epost, name: `${fornamn} ${efternamn}` }],
          subject: 'Confirmation: Your inquiry regarding a debate event – Motbild',
          htmlContent: `
            <div style="font-family: serif; color: #090023; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #090023;">Hello ${fornamn}!</h2>
              <p>Thank you for expressing <strong>${forsamling}</strong>’s interest in co-hosting a public debate event.</p>
              <p>We have received your details and will get back to you personally shortly to discuss scheduling, dates, and participating speakers.</p>
              <br/>
              <p style="font-size: 13px; color: #555;">Kind regards,<br/><strong>Peter Abramsgård</strong><br/>Motbild – Biblical Unitarian Network<br/>+46 73-330 29 83 | support@motbild.se</p>
            </div>
          `,
        }),
      });

      // Notis till Peter / Support
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: 'Motbild System', email: 'support@motbild.se' },
          to: [{ email: 'support@motbild.se', name: 'Motbild Admin' }],
          subject: `🏛️ Ny förfrågan från värdförsamling (EN): ${forsamling} (${ort})`,
          htmlContent: `
            <div style="font-family: sans-serif; color: #090023;">
              <h3>Ny församling vill bli medarrangör (Engelska sidan)</h3>
              <p><strong>Församling:</strong> ${forsamling}</p>
              <p><strong>Ort:</strong> ${ort}</p>
              <p><strong>Samfund:</strong> ${samfund || 'Ej angett'}</p>
              <p><strong>Kontaktperson:</strong> ${fornamn} ${efternamn} (${roll})</p>
              <p><strong>E-post:</strong> ${epost}</p>
              <p><strong>Telefon:</strong> ${telefon}</p>
            </div>
          `,
        }),
      });

      return res.status(200).json({ success: true });
    }

    return res.status(400).json({ error: 'Unknown type' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
