# Subir ícones na Sestini (VTEX)

Para acrescentar um ícone é necessário utilizar um padrão de nomeação, portanto siga os seguintes passos:

1. Tenha em mãos o arquivo do ícone com o tamanho: `80px` x `80px`
1. **O nome do arquivo deve estar exatamente com o mesmo nome da propriedade da VTEX (até mesmo com os espaços).**
1. Copie o nome do arquivo sem a extensão.
> *e.g*: `Mala dobrável.png` -> `Mala dobrável`
1. Cole o nome em alguma ferramenta de **Slug** (https://slugify.online/)
1. Copie o nome gerado. 
> *e.g*: `mala-dobravel`
1. Renomeie o arquivo com o nome gerado, acrescentando o prefixo **"icon-"**.
1. **Resultado do exemplo: `icon-mala-dobravel.png`**
1. Subir o arquivo padronizado para a VTEX em: 
    
    `CMS > Files Manager > Images`.
1. Mova o arquivo padronizado para a pasta do projeto em: 

    `sestini-vtex/assets/common/images/specifications`
    
    **(Ou peça para algum desenvolvedor colocá-lo no repositório.)**

#### OBS: Caso o nome não esteja padronizado, o ícone não irá aparecer nas especificações técnicas do produto**