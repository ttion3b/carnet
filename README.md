# Carnet — mobilité 4A-INFO

Espace de la promo informatique : écoles partenaires, stages anglophones, échéances, suivi privé.

## Neon (recommandé)

```bash
npm i -g neon@latest
neon link --project-id solitary-dust-83701080 --branch production -y
neon config init   # déjà fait si neon.ts existe
neon deploy
```

Le CLI remplit `.env` avec `DATABASE_URL` et `DATABASE_URL_UNPOOLED`.  
Ajoute ensuite `AUTH_SECRET` et `INVITE_CODE` dans `.env`, puis :

```bash
npm run setup
npm run dev
```

Fichiers Neon du projet : `neon.ts`, `.neon` (gitignored).

## Démarrage local (sans Neon CLI)

1. Crée une base sur [Neon](https://neon.tech) (gratuit) ou utilise une base Postgres locale.
2. Copie `.env.example` vers `.env` et remplis les variables.
3. Lance :

```bash
npm install
npm run setup
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

- Code promo (inscription) : `4A-INFO`
- Crée ton compte via `/inscription` — aucun compte démo

## Déploiement Vercel + Neon (gratuit)

### 1. Base Neon

1. Va sur [console.neon.tech](https://console.neon.tech) → **New project** (ex. `carnet-4a-info`).
2. Onglet **Connection details** → copie l’URL **direct** (host sans `-pooler`).
3. Ajoute `?sslmode=require` à la fin si ce n’est pas déjà présent → c’est ton `DATABASE_URL`.

### 2. Secret d’auth

Génère une clé longue (PowerShell) :

```powershell
[Convert]::ToBase64String((1..48 | ForEach-Object { Get-Random -Maximum 256 }))
```

Colle le résultat dans `AUTH_SECRET`.

### 3. GitHub

```bash
git add .
git commit -m "Prepare Carnet for Vercel + Neon deployment"
gh repo create carnet-4a-info --private --source=. --push
```

(Repo public si tu préfères que la classe voie le code.)

### 4. Vercel

1. [vercel.com/new](https://vercel.com/new) → **Import** ton repo GitHub.
2. **Environment variables** (Production + Preview + Development) :

| Variable | Valeur |
|----------|--------|
| `DATABASE_URL` | URL **direct** Neon (sans `-pooler`) + `?sslmode=require` |
| `AUTH_SECRET` | ta clé générée |
| `INVITE_CODE` | `4A-INFO` |

3. **Deploy**.

Le build exécute automatiquement `prisma db push` + le seed (catalogue mobilité + stages + checklists).

### 5. Partager à la classe

Envoie l’URL Vercel (ex. `https://carnet-4a-info.vercel.app`) + le code promo **4A-INFO**.

Chaque étudiant crée son compte sur `/inscription`.

## Pour la classe (sans cloud)

Sur un PC du réseau local :

```bash
npm run setup
npm run dev:lan
```

Les autres ouvrent `http://IP-DU-PC:3000`.

## Données

- **Privé** : candidatures, notes, checklist personnelle
- **Partagé** : catalogue offres, échéances promo, liste des comptes

Sources : plaquette ESIROI-IT (vœux mobilité) + liens officiels pour les stages anglophones.

## Scripts utiles

```bash
npm run setup      # schéma + seed (local)
npm run db:push    # synchroniser le schéma
npm run db:seed    # recharger le catalogue
```
