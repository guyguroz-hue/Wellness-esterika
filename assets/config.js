// ===== הגדרות =====
// המפתח הפומבי (publishable) נועד לרוץ בדפדפן ובטוח לפרסום — ההגנה מגיעה
// ממדיניות ה-RLS שב-supabase/schema.sql: הדף הציבורי יכול רק להוסיף הרשמה.
// לעולם אל תשימו כאן את מפתח ה-service_role / secret.
window.ESTERIKA_CONFIG = {
  SUPABASE_URL: 'https://reltdehazsgdxwjozrfo.supabase.co',
  SUPABASE_ANON_KEY: 'sb_publishable_TEFCY8AWV7dyic8urwvmEA_U3qO_U99',
  WHATSAPP: '972545367306',

  // המיילים שמורשים להיכנס לעמוד הנרשמים (admin.html).
  // חשוב: אותם מיילים בדיוק צריכים להופיע גם בטבלת staff ב-Supabase.
  MANAGER_EMAILS: [
    'parent1@example.com',
    'parent2@example.com'
  ]
};
