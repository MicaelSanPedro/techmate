---
title: "Como Jogar Minecraft no Chromebook da Escola com Eaglercraft"
date: "2026-05-31"
excerpt: "O Chromebook da escola bloqueia tudo? Sem problemas. Aprenda a jogar Minecraft direto no navegador usando o Eaglercraft, sem baixar nada e sem precisar de permissão de administrador."
category: "Dicas"
tags: ["chromebook", "minecraft", "eaglercraft", "escola", "jogos", "navegador", "dicas"]
coverImage: "/posts/eaglercraft-chromebook-cover.jpg"
readTime: "7 min"
featured: true
---

## Quer jogar Minecraft no Chromebook? Sim, é possível

Se você está lendo isso, provavelmente está em uma aula chata, olhando para um Chromebook da escola com Goguardian, Securly ou algum outro sistema de monitoramento, e quer jogar Minecraft. Ou talvez você esteja no intervalo e o único dispositivo disponível é esse laptop que não consegue rodar nem o Blobsie Run 3D, quanto mais o Minecraft.

A boa notícia: existe uma forma de jogar Minecraft **direto no navegador**, sem instalar nada, sem desbloquear nada, sem precisar de login de administrador, e que passa por praticamente todos os filtros da escola. O nome do projeto é **Eaglercraft**.

Neste artigo, vou explicar o que é o Eaglercraft, como acessar, como jogar, e quais são os limites dessa solução. Tudo em português, direto ao ponto.

---

## O que é o Eaglercraft?

Eaglercraft é uma **reimplementação do Minecraft em JavaScript e WebGL** que roda diretamente no navegador. Não é o Minecraft oficial da Mojang -- é um projeto open-source que recria a experiência de Minecraft 1.5.2 e 1.8.8 inteiramente em código web. Isso significa que você não precisa do Java, não precisa baixar nada, e não precisa de permissão para instalar programas.

O projeto foi criado pela comunidade de modding do Minecraft e evoluiu significativamente ao longo dos anos. Hoje existem várias versões do Eaglercraft, cada uma com foco diferente:

| Versão | O que faz | Melhor para |
|--------|-----------|-------------|
| **Eaglercraft 1.5.2** | Recriação clássica do Minecraft beta | Nostalgia, survival básico |
| **Eaglercraft 1.8.9** | Versão completa com multiplayer | PvP, Hypixel-like servers |
| **EaglercraftX** | Versão expandida com mods embutidos | Survival com shaders e extras |

O mais popular para jogar na escola é o **Eaglercraft 1.8.9**, que oferece a experiência mais completa, incluindo suporte a **servidores multiplayer** onde você pode jogar com outros alunos na mesma rede.

---

## Por que funciona na escola?

Aqui está o truque: o Eaglercraft roda dentro de uma **página web normal**. Para o filtro da escola, você está apenas acessando um site qualquer -- o mesmo tipo de acesso que você faria ao abrir o Google Classroom ou o Khan Academy. O firewall da escola vê apenas uma conexão HTTPS para um domínio web, e não tem como saber que dentro dessa página existe um jogo inteiro rodando em WebGL.

Isso funciona porque:

1. **Não é um download** -- o jogo é carregado como código JavaScript e assets da página, exatamente como qualquer site moderno carrega scripts e imagens
2. **Não precisa de Java** -- o Minecraft original requer Java Runtime Environment, que a escola bloqueia. O Eaglercraft roda no motor JavaScript do navegador
3. **Não precisa de instalação** -- não há arquivo .exe, .deb ou .app para instalar
4. **O tráfego é HTTPS padrão** -- não há nada diferente no tráfego que um filtro possa identificar como "jogo"
5. **Roda em qualquer dispositivo** -- Chromebook, PC, tablet, celular, qualquer coisa com um navegador moderno

Isso é diferente de tentar baixar o Minecraft real, que seria bloqueado tanto pelo filtro de download quanto pela ausência do Java no Chromebook.

---

## Como acessar o Eaglercraft: passo a passo

### Passo 1: Abra o navegador

No Chromebook da escola, abra o Google Chrome (ou qualquer navegador disponível).

### Passo 2: Acesse um dos links do Eaglercraft

O projeto Eaglercraft usa vários domínios e espelhos para evitar bloqueios. Aqui estão os mais confiáveis:

```
https://eaglercraft.com/
```

Se esse domínio estiver bloqueado, tente os espelhos alternativos. A comunidade mantém lista de links atualizados em fóruns como o Reddit (r/eaglercraft) e em servidores Discord dedicados.

### Passo 3: Aguarde o carregamento

O Eaglercraft carrega todos os assets do jogo (texturas, sons, modelos 3D) na primeira vez. Isso pode levar de 10 a 30 segundos dependendo da velocidade da internet da escola. Nas próximas visitas, o navegador usa cache e carrega mais rápido.

### Passo 4: Configure e jogue

Depois de carregar, você verá a tela de menu do Minecraft (recriada em WebGL). Configure seu nome de jogador, ajuste as configurações de vídeo se necessário, e clique em "Singleplayer" ou "Multiplayer" para começar.

---

## Configurações recomendadas para Chromebook

Chromebooks geralmente têm hardware modesto (CPU Celeron, GPU integrada Intel HD, 4GB de RAM). Para o Eaglercraft rodar bem, ajuste estas configurações:

**Configurações de vídeo:**
- Render distance: **4-6 chunks** (menos = mais FPS)
- VSync: **Off**
- Smooth lighting: **Mínimo**
- Particles: **Mínimo**
- Clouds: **Off**
- Fullscreen: **On** (opcional, mas ajuda)

**Dicas extras de performance:**
- Feche todas as outras abas do navegador
- Feche outros apps do Chromebook (Google Docs, Gmail, etc.)
- Se o touchpad estiver lagando, conecte um mouse USB
- Use fones de ouvido para os sons (mais imersivo e menos chamativo)

---

## Jogando multiplayer com outros alunos

O Eaglercraft 1.8.9 suporta **multiplayer nativo**, incluindo a possibilidade de jogar em **servidores públicos Eaglercraft** que funcionam como mini-versões do Hypixel. Existem servers com mini-games, BedWars, SkyWars, survival multiplayer, e até mods customizados.

Para jogar multiplayer:

1. No menu principal, clique em **Multiplayer**
2. Clique em **Add Server**
3. Cole o endereço IP de um servidor Eaglercraft público
4. Clique em **Join Server**

A comunidade mantém listas de servidores ativos em fóruns e no Discord do Eaglercraft. Alguns dos mais populares são:

| Server | Modo | Jogadores |
|--------|------|-----------|
| **eaglercraft.bettermc.net** | Survival/PvP | 50+ |
| **wss://eaglercraft.axayap2.com** | Mini-games | 30+ |
| **Arena Lone Survival** | PvP/FFA | 20+ |

> **Nota:** Os servidores Eaglercraft usam WebSockets (wss://) ao invés de TCP tradicional. Isso significa que funcionam através de proxy HTTP, algo que servidores Minecraft normais não conseguem fazer.

---

## Se o site estiver bloqueado

Se o domínio principal do Eaglercraft estiver na lista negra da sua escola, existem formas de contornar:

### 1. Use um proxy web

Acesse um proxy web como **Hidester** ou **CroxyProxy** e cole a URL do Eaglercraft. O proxy vai carregar o site e entregar para você dentro da própria página do proxy. O artigo sobre [proxy web](/blog/como-acessar-sites-bloqueados-proxy) no blog explica isso em detalhes.

### 2. Use um link alternativo

A comunidade do Eaglercraft publica novos links toda semana em fóruns e no Discord. Se um domínio for bloqueado, outro surgirá para substituir.

### 3. Use a versão offline (se possível)

Existe uma versão do Eaglercraft que pode ser salva como arquivo HTML e aberta offline. Se você conseguir baixar o arquivo em casa, pode transferir para o Google Drive e abrir no Chromebook da escola pelo navegador.

---

## Limitações do Eaglercraft

É importante saber o que você NÃO vai ter:

- **Não é o Minecraft oficial** -- é uma recriação, não o jogo da Mojang
- **Versão antiga** -- baseado no Minecraft 1.8.9, não tem os blocos, mobs e features das versões recentes (1.20+)
- **Sem mods externos** -- você não pode instalar mods do Forge/Fabric como Sodium ou OptiFine
- **Sem skin personalizada (por padrão)** -- precisa usar skins do servidor ou do site Eaglercraft
- **Áudio pode ter bugs** -- alguns sons não reproduzem corretamente dependendo do navegador
- **Não funciona bem em iOS Safari** -- o melhor desempenho é no Chrome/Edge/Brave desktop

Apesar dessas limitações, a experiência é surpreendentemente boa. A recriação em WebGL é fiel o suficiente para que você sinta que está jogando o Minecraft de verdade, especialmente em multiplayer.

---

## Dicas para não ser pego jogando

Vamos ser realistas: você está jogando durante a aula. Aqui vão algumas dicas práticas para não chamar atenção:

- **Não use fullscreen** -- jogue em uma aba pequena e minimize quando o professor olhar
- **Sem som** -- desative o áudio ou use fones de ouvido (passe o cabo pela manga da camisa)
- **Tenha uma aba de trabalho aberta** -- Google Classroom ou Google Docs na aba ao lado para alternar rápido
- **Ctrl+Tab** é seu melhor amigo -- muda de aba instantaneamente
- **Não jogue PvP com mic ativo** -- gritar "ACABEI DE MATAR O FULL DIAMOND" não é sutil
- **Feche o jogo quando não estiver jogando** -- deixar aberto consome RAM e o Chromebook pode ficar lento

---

## Conclusão

O Eaglercraft é a solução definitiva para quem quer jogar Minecraft em um Chromebook da escola sem ter que instalar nada nem burlar bloqueios de forma arriscada. Ele roda direto no navegador, passa por filtros de rede porque usa tráfego web padrão, e oferece uma experiência de jogo surpreendentemente completa com suporte a multiplayer.

Não é perfeito -- é baseado em uma versão antiga do Minecraft e não tem todas as features do jogo original. Mas para matar o tempo durante a aula de matemática ou jogar com os amigos no intervalo, é mais do que suficiente. Acesse, carregue, jogue. Simples assim.
