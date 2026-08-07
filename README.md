# EXCELL Engenharia e Tecnologia — Site Institucional

Site institucional completo desenvolvido em HTML5, CSS3 e JavaScript puro.  
Pronto para hospedagem no **GitHub Pages** com integração Cloudflare.

---

## Estrutura do Projeto

```
excell-new/
├── index.html                    # Home
├── sobre.html                    # A EXCELL
├── telecomunicacoes.html         # Telecomunicações Corporativas
├── pericias.html                 # Perícias de Engenharia
├── assistente-tecnico.html       # Assistente Técnico
├── laudos.html                   # Laudos Técnicos
├── blog.html                     # Blog (listagem)
├── contato.html                  # Contato
├── sitemap.xml                   # Sitemap para indexação Google
├── robots.txt
├── blog/
│   ├── telecom-pabx-nuvem.html
│   ├── telecom-tronco-sip.html
│   ├── telecom-integracao-whatsapp.html
│   ├── telecom-softphones.html
│   ├── telecom-redundancia.html
│   ├── telecom-qos-voip.html
│   ├── telecom-gravacao-lgpd.html
│   ├── telecom-pabx-advocacia.html
│   ├── pericia-perito-cpc.html
│   ├── pericia-extrajudicial.html
│   ├── pericia-cadeia-custodia.html
│   ├── pericia-nomeacao.html
│   ├── pericia-sobretensoes.html
│   ├── asst-engenheiro-advogado.html
│   ├── asst-impugnar-laudo.html
│   ├── asst-vistoria.html
│   ├── asst-contestacao-toi.html
│   ├── asst-ressarcimento-aneel.html
│   ├── laudo-icms-energia.html
│   ├── laudo-quem-tem-direito-icms.html
│   ├── laudo-medicao-energia.html
│   ├── laudo-recuperacao-retroativa.html
│   └── laudo-atualizacao.html
└── assets/
    ├── css/
    │   └── style.css             # Design System global
    ├── js/
    │   └── main.js               # Header/footer injetados, menu mobile, filtros
    └── images/
        ├── logo.svg              # Logo colorida (fundo claro)
        └── logo-white.svg        # Logo branca (fundo escuro)
```

---

## Tecnologias

- **HTML5** semântico com meta tags SEO completas
- **CSS3** com CSS Custom Properties (design tokens), Flexbox, Grid, responsivo mobile-first
- **JavaScript** vanilla (sem dependências externas)
- **Google Fonts** — Poppins + Inter

---

## Publicação no GitHub Pages

1. Vá em **Settings → Pages** no repositório
2. Source: **Deploy from a branch**
3. Branch: `main` / `root`
4. Aguarde o deploy (≈ 1 minuto)
5. Acesse: `https://paulorozin.github.io/excell-new/`

### Configuração com Cloudflare (domínio próprio)

1. No Cloudflare, adicione um registro `CNAME`:  
   - Name: `@` (ou `www`)  
   - Target: `paulorozin.github.io`
2. No GitHub Pages, adicione seu domínio personalizado em **Custom domain**
3. Marque **Enforce HTTPS**

---

## Placeholders a substituir

Antes de publicar, busque por `[PLACEHOLDER]` no código e substitua:

| Placeholder | Valor a inserir |
|---|---|
| CREA: [PLACEHOLDER] | Número do CREA do engenheiro responsável |
| [PLACEHOLDER — Nome do Engenheiro] | Nome completo do engenheiro |
| CNPJ: [PLACEHOLDER] | CNPJ da empresa |
| Endereço completo: [PLACEHOLDER] | Endereço físico |
| CEP: [PLACEHOLDER] | CEP |

---

## Contato configurado

| Canal | Valor |
|---|---|
| WhatsApp | +55 (43) 2018-1300 |
| Telefone | (43) 2018-1300 |
| E-mail | contato@excellengenharia.com.br |
| Instagram | instagram.com/excell_engenharia |

---

## Customizações adicionais

Para adicionar a logo PNG real (fornecida):
1. Salve o arquivo como `assets/images/logo.png` e `assets/images/logo-white.png`
2. Em `main.js`, altere as referências de `.svg` para `.png` nas tags `<img>`

---

*Desenvolvido por Antigravity AI · EXCELL Engenharia e Tecnologia · 2025*
