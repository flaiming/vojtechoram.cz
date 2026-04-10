---
title: "Struktura projektu v Djangu"
date: 2014-01-11
slug: "struktura-projektu-v-djangu"
tags: [django, programvání, zálohování, struktura projektu, logování, konfigurace]
lang: cs
description: "Jak jsem vyladil strukturu svých Django projektů po mnoha iteracích — oddělení aplikací, logování, zálohování a správa více prostředí."
---

Docela dlouho mi trvalo, než jsem vyladil strukturu mých projektů na Djangu. Postupně podle přibývajících požadavků jsem své projekty refraktoroval, až jsem našel určitý pro mě (zatím) ideální stav. Snad by se to někomu mohlo hodit :)

```
vojtechoram.cz      # hlavní adresář webu
   ├── bin
   ├── include
   ├── lib
   ├── local
   ├── static       # statické soubory Djanga
   └── root         # GIT repozitář
       ├── apps
       │   ├── __init__.py
       │   ├── blog
       │   │   ├── __init__.py
       │   │   ├── templates
       │   │   ├── locale
       │   │   ├── static
       │   │   ├── admin.py
       │   │   ├── models.py
       │   │   ├── urls.py
       │   │   └── views.py
       │   └── news
       │       ├── __init__.py
       │       ├── templates
       │       ├── locale
       │       ├── static
       │       ├── admin.py
       │       ├── models.py
       │       ├── urls.py
       │       └── views.py
       ├── libs
       │   ├── importer
       │   │   ├── __init__.py
       │   │   ├── models.py
       │   │   ├── views.py
       │   │   └── tests.py
       │   └── __init__.py
       ├── confs
       │   ├── production
       │   │   ├── project_nginx.conf
       │   │   └── project_uwsgi.ini
       │   └── test
       │       ├── project_nginx.conf
       │       └── project_uwsgi.ini
       ├── settings
       │   ├── __init__.py
       │   ├── common.py
       │   ├── dev.py
       │   ├── test.py
       │   └── production.py
       ├── requirements
       │   ├── common.txt
       │   ├── dev.txt
       │   ├── test.txt
       │   └── production.txt
       ├── environment.py         # není v GITu
       ├── environment.template   # šablona pro environment.py
       ├── manage.py
       ├── media                  # není v GITu
       └── wsgi.py
```

V kořenový adresáři webu `vojtechoram.cz` jsou převážně složky, vygenerované nástrojem `virtualenv`. Složka `static` obsahuje statické soubory Djanga (generované přes `./manage.py collectstatic`). Samotný GIT repozitář s webem obsahuje složka `root`. Jediný soubor `environment.py` je vyjmutý z GIT repozitáře, neboť obsahuje nastavení aktuálního prostředí (dev, test, production).

Proč používám takovou strukturu:

**Oddělení generických knihoven.** Generické knihovny jsou umístěny odděleně od aplikací. Ideálně by se všechny externí knihovny měly instalovat přes pypi, nicméně pokud tato možnost není, je dobré mít tyto knihovny alespoň na jasně definovaném místě.

**Logování.** Django umožňuje velmi dobře nastavit logování pro jednotlivé aplikace/knihovny. Je však třeba mít je seskupené pod knihovnami (`apps.blog`, `libs.importer`) a nepřídávat `apps` a `libs` přímo do `PYTHONPATH`. Pak můžete nastavit logger pro všechny aplikace a knihovny, namísto nastavování loggeru pro každou aplikaci a knihovnu zvlášť.

**Zálohování.** Nejlepší je zálohovat pouze nezbytné soubory a nic víc, ideálně celou složku `root`. Například vygenerované statické soubory zálohovat nepotřebuji, stejně jako logy, proto jsou umístěny mimo `root`. Co však musím zálohovat jsou nahrané soubory ve složce `media`, proto jsou umístěny v GIT repozitáři i přes to, že nejsou přímo vedené v GITu. Mám alespoň vše pohromadě v jedné složce a už se tím nemusím zabývat.

**Bezproblémová podpora více jazykových verzí.** Pokud píšete Django aplikace s podporou zobrazení ve více jazycích, možná jste narazili na problém související s nevhodnou strukturou projektu pro správné vygenerování souborů s jednotlivými jazykovými verzemi překladů. Především je důležité Django aplikace se překlady nezanořovat, protože to způsobí, že budete vnořenou aplikaci překládat i ve vnější. Pokud ale budete udržovat vše, co je třeba překládat a patří k dané aplikaci odděleně, nebude problém s duplicitou. Konkrétně třeba HTML šablony (složka `templates`) je výhodné mít u každé aplikace zvlášť a ne v jednom centrálním adresáři pro všechny aplikace právě z tohoto důvodu.

**Konfigurace pro více běhových prostředí.** Produkční verze projektu obvykle běží někde jinde, než jej vyvíjíme, což vytváří požadavek správy konfigurací pro jednolivá běhová prostředí. Ve složce conf mám konfigurace pro uWSGI a Nginx pro produkční a testovací prostředí (pro vývojové nemám, testuji přes `./manage.py runserver`).

**Správa nastavení Djanga pro více běhových prostředí.** Lokální nastavení Djanga jsem umístil do složky `settings`, přičemž nastavení z `common.py` se použije vždy. V souborech pro jednotlivá prostředí mám především individuální nastavení debugu, databáze a instalovaných aplikací.

**Správa používaných aplikací třetích stran.** Textové seznamy potřebých pythoních modulů pro běh uchovávám v adresáři `requirements`. `common.txt` je platný pro všechna prostředí, jak již název napovídá. Pro instalaci stačí jen spustit `pip install -r requirements/common.txt -r requirements/production.txt` pro instalaci všech obecných a produkčních modulů.

**Snadné nastavení aktuálního prostředí.** Pod jakým prostředím projekt běží pozná podle toho, jak je nastavena proměnná `DJANGO_SETTINGS_MODULE`. Tu nastavuji v `environment.py` přes `os.environ.setdefault`. Určitě by to šlo i líp (například nastavit tu proměnnou přímo v systému), nicméně zatím mi to vyhovuje takto.

P.S.: Pokud se vám zdá, že by šlo něco z toho udělat lépe, napište to prosím do komentárů :) Rád se poučím.

Kde jsem se inspiroval:

- [http://www.deploydjango.com/django_project_structure/](http://www.deploydjango.com/django_project_structure/)
- [http://timmyomahony.com/blog/general-django-project-structure-or-folder-layout/](http://timmyomahony.com/blog/general-django-project-structure-or-folder-layout/)
