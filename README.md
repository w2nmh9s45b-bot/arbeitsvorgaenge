# Arbeitsvorgänge – SB Organisation (1.1.2)

Geführte Web-App für die Arbeitsvorgänge der Stelle Sachbearbeitung Organisation
(Stadtverwaltung Lahnstein): 5 Aufgabengebiete → Aufgaben → 36 Arbeitsvorgänge
als Schritt-für-Schritt-Prüfschemata mit Erklärungen, Rechenmodulen
(PBE, Kapitalwert, KGSt-Wertzahl, Wahl-Fristenrechner, Quoren) und
kopierbarem Ergebnis-Protokoll.

- **Live:** https://w2nmh9s45b-bot.github.io/arbeitsvorgaenge/
- Alle Eingaben bleiben lokal im Browser (localStorage), keine Datenübertragung.
- PWA: In Safari „Teilen → Zum Home-Bildschirm" – läuft danach offline.

Quelle/Pflege: Obsidian-Vault `Arbeit/App/Arbeitsvorgänge-App.html`
(Inhalte aus „Handbuch Arbeitsvorgänge" und „Handbuch Arbeitsvorgänge Wahlen",
Datenstand 03.07.2026). Bei Updates diese Datei als `index.html` neu hochladen –
der Service Worker lädt Seiten-Updates automatisch (network-first).
