---
title: "RoCAPTCHA"
date: 2014-06-21
slug: "rocaptcha"
tags: [api, rocaptcha, mybb, captcha, django, php, RoCAPTCHA, asirra]
lang: cs
description: "CAPTCHA test založený na otáčení obrázků do správné polohy (rotační CAPTCHA). Použití tam, kde je třeba odlišit legitimního uživatele od počítače."
---

Pod touto trochu krkolomnou zkratkou se skrývá [CAPTCHA test](http://cs.wikipedia.org/wiki/CAPTCHA), založený na otáčení obrázků do správné polohy (rotační CAPTCHA). Použití najde všude, kde je třeba odlišit legitimního lidského uživatele od počítače (registrace, komentáře, přihlašování).

![RoCAPTCHA](https://vojtechoram.cz/media/blog/rocaptcha.png)

Základ RoCAPTCHA test vznikl v rámci mé [diplomové práce](http://hdl.handle.net/10195/51820). Nápad použít pro CAPTCHA test otáčení obrázků do správné polohy bohužel není můj - vznikl v roce 2009 v rámci výzkumu Googlu [What's Up CAPTCHA](http://research.google.com/pubs/pub35157.html). V tomto výzkumu se ovšem počítalo s použitím jakýchkoli obrázků (s filtrací snadno počítačem otočitelných, například obsahující lidi, horizont, oblohu apod.). Není zde ale téměř žádná přidaná hodnota, takže jsem ji ještě zkřížil s CAPTCHA testem [Asirra](http://research.microsoft.com/en-us/um/redmond/projects/asirra/) od Microsoftu, kde jde o rozpoznání koček od psů. Přidaná hodnota spočívá v možnosti adoptovat skrze Asirru zvířata z útulků, neboť právě z fotografií zvířat z útulků je tvořena báze dat. To mi navíc řeší další problém, neboť zvířata jsou zpravidla focena z pohledu člověka, tedy v úhlu cca 45°. Tím pádem zde nenajdete horizont, vodní hladinu, oblohu a většinou ani obličeje lidí. A jako bonus má stejnou přidanou hodnotu, jako Asirra (o té podrobněji napíšu až v dalších článcích).

## Výhody

- Mnohem zábavnější, než rozpoznávání zdeformovaného textu.
- Přirozený spůsob řešení (především na dotykových zařízeních).
- Rychle řešitelná.
- Nezabírá na stránce mnoho prostoru (oproti jiným obrázkovým CAPTCHA testům).
- Přidaná hodnota - umožňuje lépe propagovat zvířata v útulcích a tím urychlit jejich umístění u nových majitelů.
- Pomáhá zvířatům v útulcích :)

## Nevýhody

- Neřešitelná lidmi se zrakovým postižením.
- Pro zaručení bezpečnosti je třeba velká a neustále aktualizovaná báze dat.
- Většinu obrázků lze automaticky otáčet do správné polohy rozpoznáváním obličejů zvířat.

Co se týče nevýhod, většina z nich lze vyřešit. Například bázi dat je možno neustále aktualizovat jak z útulků, tak z jiných veřejně dostupných zdrojů obrázků, jako například [Flickr](https://www.flickr.com/). RoCAPTCHA tuto funkčnost již má zabudovanou, nicméně zatím není používaná v takové míře, aby mělo cenu bázi dat pravidelně aktualizovat. Teoreticky je možné, aby útočník zrekonstruoval databázi RoCAPTCHy použitím stejných zdrojů, nicméně při opravdu pravidelné aktualizaci báze dat by tento útok byl náročný z hlediska úložiště a výpočetního výkonu.

Větší problém představuje útok s pomocí nástrojů pro automatické rozpoznání polohy zvířecího obličeje. Použitím pouze obrázků, kde zvířata nemají obličeje ve vzpřímené poloze by velmi omezilo bázi dat. Lze spoléhat jedině na to, že rozpoznání polohy zvířecích obličejů je přecejen o něco složitější než u lidí a navíc zde není tolik současně použitelných řešení, jako u rozpoznávání polohy u lidských obličejů. I ty nejlepší CAPTCHA testy budou časem prolomeny, neboť se stává čím dál tím obtížnější rozpoznat v prostředí internetu počítač od člověka.

## Pluginy

- [PHP](https://bitbucket.org/Flaiming/rocaptcha-php)
- [Django](https://bitbucket.org/Flaiming/django-rocaptcha)
- [myBB](https://github.com/flaiming/rocaptcha-mybb)

Množství pluginů je zatím velmi tristní. Takže pokud se vám RoCAPTCHA zalíbila, máte možnost získat můj neskonalý vděk a přispět světu dalším pluginem :) Pro další postup navštivte dokumentaci [API](http://rocaptcha.com/cs/api). Další možnost přestavuje [implementace bez použití pluginu](http://rocaptcha.com/cs/implementation).

## Další vývoj

Pokud bude čas a chuť, chtěl bych dodělat více barevných variant uživatelského rozhraní. Dále mám v pořadníku optimalizaci kódu a případně i možnost nahrát si vlastní obrázky. Nejdřív to ale bude chtít více pluginů, bez toho se obecná obliba asi moc nepohne.

P.S.: RoCAPTCHu se můžete v praxi vyzkoušet pod tímto článkem v komentářích :)
