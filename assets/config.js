// ===== הגדרות =====
// המפתח הפומבי (publishable) נועד לרוץ בדפדפן ובטוח לפרסום — ההגנה מגיעה
// ממדיניות ה-RLS שב-supabase/schema.sql: הדף הציבורי יכול רק להוסיף הרשמה.
// לעולם אל תשימו כאן את מפתח ה-service_role / secret.
window.ESTERIKA_CONFIG = {
  SUPABASE_URL: 'https://reltdehazsgdxwjozrfo.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_TEFCY8AWV7dyic8urwvmEA_U3qO_U99',
  WHATSAPP: '972545367306',

  // התראה במייל על כל הרשמה חדשה (רשות).
  // נרשמים בחינם ב-web3forms.com עם המייל שאליו רוצים לקבל את ההתראות,
  // מקבלים Access Key במייל ומדביקים אותו כאן. ריק = בלי התראות.
  NOTIFY_ACCESS_KEY: '61544ec9-1637-40cb-ad78-3746aa4fe2fb',

  // המיילים שמורשים להיכנס לעמוד הנרשמים (admin.html).
  // חשוב: אותם מיילים בדיוק צריכים להופיע גם בטבלת staff ב-Supabase.
  MANAGER_EMAILS: [
    'gmrozental@gmail.com',
    'hilirozental@gmail.com',
    'esterikatruck@gmail.com',
    'guyguroz@gmail.com'
  ]
};
