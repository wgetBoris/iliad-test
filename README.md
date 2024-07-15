# Guida per Avviare iliad-test (Angular e Lumen)

Questo repository contiene due servizi separati per eseguire un'applicazione web completa utilizzando Angular per il frontend e Lumen per il backend. Segui i passaggi di seguito per avviare l'applicazione localmente.

## Prerequisiti

Assicurati di avere installato i seguenti strumenti prima di iniziare:

- Node.js e npm (per Angular)
- PHP e Composer (per Lumen)
- Un server MySQL (puoi utilizzare un'installazione locale o remota)

## Clona questo repository

```bash
git clone https://github.com/wgetBoris/iliad-test.git
```

## Avvio del Backend Lumen

1. **Dopo aver clonato il repository passa alla directory del backend Lumen**
   ```bash
   cd lumen/
   ```
2. **Installa le dipendenze**
   ```bash
   composer install
   ```
3. **Configura l'ambiente**
   Copia il file .env.example in .env e modifica le variabili d'ambiente necessarie, come DB_DATABASE, DB_USERNAME e DB_PASSWORD.

```bash
cp .env.example .env
```

4. **Esegui le migrazioni**

```bash
php artisan migrate
```

5. **Avvia il server**

```bash
php -S localhost:8000 -t public
```

## Avvio del Frontend Angular

1. **Dopo aver clonato il repository passa alla directory del frontend Angular**
   ```bash
   cd ../angular/
   ```
2. **Installa le dipendenze**
   ```bash
   npm install --legacy-peer-deps
   ```
3. **Avvia il server**

```bash
ng serve
```

Ora puoi accedere all'applicazione Angular dal tuo browser all'indirizzo http://localhost:4200.
