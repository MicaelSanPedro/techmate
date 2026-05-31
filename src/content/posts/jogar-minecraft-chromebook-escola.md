---
title: "Como Jogar Minecraft no Chromebook da Escola com Eaglercraft"
date: "2026-05-31"
excerpt: "O Chromebook da escola bloqueia tudo? Sem problemas. Aprenda a jogar Minecraft direto no navegador usando o Eaglercraft, sem baixar nada e sem precisa de permissao de administrador."
category: "Dicas"
tags: ["chromebook", "minecraft", "eaglercraft", "escola", "jogos", "navegador", "dicas"]
coverImage: "/posts/eaglercraft-chromebook.jpg"
readTime: "7 min"
featured: true
---

## Quer jogar Minecraft no Chromebook? Sim, e possivel

Se voce esta lendo isso, provavelmente esta em uma aula chata, olhando para um Chromebook da escola com Goguardian, Securly ou algum outro sistema de monitoramento, e quer jogar Minecraft. Ou talvez voce esteja no intervalo e o unico dispositivo disponivel e esse laptop que nao consegue rodar nem o Blobsie Run 3D, quanto mais o Minecraft.

A boa noticia: existe uma forma de jogar Minecraft **direto no navegador**, sem instalar nada, sem desbloquear nada, sem precisa de login de administrador, e que passa por praticamente todos os filtros da escola. O nome do projeto e **Eaglercraft**.

Neste artigo, vou explicar o que e o Eaglercraft, como acessar, como jogar, e quais sao os limites dessa solucao. Tudo em portugues, direto ao ponto.

---

## O que e o Eaglercraft?

Eaglercraft e uma **reimplementacao do Minecraft em JavaScript e WebGL** que roda diretamente no navegador. Nao e o Minecraft oficial da Mojang -- e um projeto open-source que recria a experiencia de Minecraft 1.5.2 e 1.8.8 inteiramente em codigo web. Isso significa que voce nao precisa do Java, nao precisa baixar nada, e nao precisa de permissao para instalar programas.

O projeto foi criado pela comunidade de modding do Minecraft e evoluiu significativamente ao longo dos anos. Hoje existem varias versoes do Eaglercraft, cada uma com foco diferente:

| Versao | O que faz | Melhor para |
|--------|-----------|-------------|
| **Eaglercraft 1.5.2** | Recriacao classic do Minecraft beta | Nostalgia, survival basico |
| **Eaglercraft 1.8.9** | Versao completa com multiplayer | PvP, Hypixel-like servers |
| **EaglercraftX** | Versao expandida com mods embutidos | Survival com shaders e extras |

O mais popular para jogar na escola e o **Eaglercraft 1.8.9**, que oferece a experiencia mais completa, incluindo suporte a **servidores multiplayer** onde voce pode jogar com outros alunos na mesma rede.

---

## Por que funciona na escola?

Aqui esta o truque: o Eaglercraft roda dentro de uma **pagina web normal**. Para o filtro da escola, voce esta apenas acessando um site qualquer -- o mesmo tipo de acesso que voce faria ao abrir o Google Classroom ou o Khan Academy. O firewall da escola vejo apenas uma conexao HTTPS para um dominio web, e nao tem como saber que dentro dessa pagina existe um jogo inteiro rodando em WebGL.

Isso funciona porque:

1. **Nao e um download** -- o jogo e carregado como codigo JavaScript e assets da pagina, exatamente como qualquer site moderno carrega scripts e imagens
2. **Nao precisa de Java** -- o Minecraft original requer Java Runtime Environment, que a escola bloqueia. O Eaglercraft roda no motor JavaScript do navegador
3. **Nao precisa de instalacao** -- nao ha arquivo .exe, .deb ou .app para instalar
4. **O trafego e HTTPS padrao** -- nao ha nada diferente no trafego que um filtro possa identificar como "jogo"
5. **Roda em qualquer dispositivo** -- Chromebook, PC, tablet, celular, qualquer coisa com um navegador moderno

Isso e diferente de tentar baixar o Minecraft real, que seria bloqueado tanto pelo filtro de download quanto pela ausencia do Java no Chromebook.

---

## Como acessar o Eaglercraft: passo a passo

### Passo 1: Abra o navegador

No Chromebook da escola, abra o Google Chrome (ou qualquer navegador disponivel).

### Passo 2: Acesse um dos links do Eaglercraft

O projeto Eaglercraft usa varios dominios e espelhos para evitar bloqueios. Aqui estao os mais confiaveis:

```
https://eaglercraft.com/
```

Se esse dominio estiver bloqueado, tente os espelhos alternativos. A comunidade mantem lista de links atualizados em foruns como o Reddit (r/eaglercraft) e em servidores Discord dedicados.

### Passo 3: Aguarde o carregamento

O Eaglercraft carrega todos os assets do jogo (texturas, sons, modelos 3D) na primeira vez. Isso pode levar de 10 a 30 segundos dependendo da velocidade da internet da escola. Nas proximas visitas, o navegador usa cache e carrega mais rapido.

### Passo 4: Configure e jogue

Depois de carregar, voce vera a tela de menu do Minecraft (recriada em WebGL). Configure seu nome de jogador, ajuste as configuracoes de video se necessario, e clique em "Singleplayer" ou "Multiplayer" para comecar.

---

## Configuracoes recomendadas para Chromebook

Chromebooks geralmente tem hardware modesto (CPU Celeron, GPU integrada Intel HD, 4GB de RAM). Para o Eaglercraft rodar bem, ajuste estas configuracoes:

**Configuracoes de video:**
- Render distance: **4-6 chunks** (menos = mais FPS)
- VSync: **Off**
- Smooth lighting: **Minimo**
- Particles: **Minimo**
- Clouds: **Off**
- Fullscreen: **On** (opcional, mas ajuda)

**Dicas extras de performance:**
- Feche todas as outras abas do navegador
- Feche outros apps do Chromebook (Google Docs, Gmail, etc.)
- Se o touchpad estiver lagando, conecte um mouse USB
- Use fones de ouvido para os sons (mais imersivo e menos chamativo)

---

## Jogando multiplayer com outros alunos

O Eaglercraft 1.8.9 suporta **multiplayer nativo**, incluindo a possibilidade de jogar em **servidores publicos Eaglercraft** que funcionam como mini-versoes do Hypixel. Existem servers com mini-games, BedWars, SkyWars, survival multiplayer, e ate mods customizados.

Para jogar multiplayer:

1. No menu principal, clique em **Multiplayer**
2. Clique em **Add Server**
3. Cole o endereco IP de um servidor Eaglercraft publico
4. Clique em **Join Server**

A comunidade mantem listas de servidores ativos em foruns e no Discord do Eaglercraft. Alguns dos mais populares sao:

| Server | Modo | Jogadores |
|--------|------|-----------|
| **eaglercraft.bettermc.net** | Survival/PvP | 50+ |
| **wss://eaglercraft.axayap2.com** | Mini-games | 30+ |
| **Arena Lone Survival** | PvP/FFA | 20+ |

> **Nota:** Os servidores Eaglercraft usam WebSockets (wss://) ao inves de TCP tradicional. Isso significa que funcionam atraves de proxy HTTP, algo que servidores Minecraft normais nao conseguem fazer.

---

## Se o site estiver bloqueado

Se o dominio principal do Eaglercraft estiver na lista negra da sua escola, existem formas de contornar:

### 1. Use um proxy web

Acesse um proxy web como **Hidester** ou **CroxyProxy** e cole a URL do Eaglercraft. O proxy vai carregar o site e entregar para voce dentro da propria pagina do proxy. O artigo sobre [proxy web](/blog/como-acessar-sites-bloqueados-proxy) no blog explica isso em detalhes.

### 2. Use um link alternativo

A comunidade do Eaglercraft publica novos links toda semana em foruns e no Discord. Se um dominio for bloqueado, outro surgira para substituir.

### 3. Use a versao offline (se possivel)

Existe uma versao do Eaglercraft que pode ser salva como arquivo HTML e aberta offline. Se voce conseguir baixar o arquivo em casa, pode transferir para o Google Drive e abrir no Chromebook da escola pelo navegador.

---

## Limitacoes do Eaglercraft

E importante saber o que voce NAO vai ter:

- **Nao e o Minecraft oficial** -- e uma recriacao, nao o jogo da Mojang
- **Versao antiga** -- baseado no Minecraft 1.8.9, nao tem os blocos, mobs e features das versoes recentes (1.20+)
- **Sem mods externos** -- voce nao pode instalar mods do Forge/Fabric como Sodium ou OptiFine
- **Sem skin personalizada (por padrao)** -- precisa usar skins do servidor ou do site Eaglercraft
- **Audio pode ter bugs** -- alguns sons nao reproduzem corretamente dependendo do navegador
- **Nao funciona bem em iOS Safari** -- o melhor desempenho e no Chrome/Edge/Brave desktop

Apesar dessas limitacoes, a experiencia e surpreendentemente boa. A recriacao em WebGL e fiel o suficiente para que voce sinta que esta jogando o Minecraft de verdade, especialmente em multiplayer.

---

## Dicas para nao ser pego jogando

Vamos ser realistas: voce esta jogando durante a aula. Aqui vao algumas dicas praticas para nao chamar atencao:

- **Nao use fullscreen** -- jogue em uma aba pequena e minimize quando o professor olhar
- **Sem som** -- desative o audio ou use fones de ouvido (passe o cabo pela manga da camisa)
- **Tenha uma aba de trabalho aberta** -- Google Classroom ou Google Docs na aba ao lado para alternar rapido
- **Ctrl+Tab** e seu melhor amigo -- muda de aba instantaneamente
- **Nao jogue PvP com mic ativo** -- gritar "ACABEI DE MATAR O FULL DIAMOND" nao e sutil
- **Feche o jogo quando nao estiver jogando** -- deixar aberto consome RAM e o Chromebook pode ficar lento

---

## Conclusao

O Eaglercraft e a solucao definitiva para quem quer jogar Minecraft em um Chromebook da escola sem ter que instalar nada nem burlar bloqueios de forma arriscada. Ele roda direto no navegador, passa por filtros de rede porque usa trafego web padrao, e oferece uma experiencia de jogo surpreendentemente completa com suporte a multiplayer.

Nao e perfeito -- e baseado em uma versao antiga do Minecraft e nao tem todas as features do jogo original. Mas para matar o tempo durante a aula de matematica ou jogar com os amigos no intervalo, e mais do que suficiente. Acesse, carregue, jogue. Simples assim.
