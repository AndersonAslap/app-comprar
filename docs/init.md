> comando para criar projeto 

- Para executar o comando abaixo é necessário ter o nodejs instalado
- O template Blank (TypeScript) : cria um projeto em branco com uma estrutura mínima
de um projeto react nativo com o expo já com o typescript configurado.

npx create-expo-app --template
npx create-expo-app --template

? choose a template:
- Default
- Blank
- Blank (TypeScript)
- Navigation (TypeScript)
- Blank (Bare)

> Blank (TypeScript)

? what is your app named > $name_project
```

## Estrutura de Pastas e Arquivos

```
assets/         # É onde fica os icones
app.json        # É onde fica as Informações sobre a aplicação
App.tsx         # É o componente inicial da aplicação
index.ts        # É o ponto de entrada da aplicação, é onde registra o componente root
package.json    # Tem a lista de dependência de dev e prod e também os scripts de execução
tsconfig.json   # Tem as definições de configuração do typescript
```

- O nome desse tipo de projeto (expo go) é : projeto gerenciado (expo managed workflow)
- Nesse tipo de projeto não temos visibilidade da pasta de código nativo nem do android 
e nem do ios
- Não há visibilidade desses códigos nativos porquê o expo cuidará de tudo

> comando para executar a aplicação

```bash
npx expo start

ou

npx expo start --tunnel
```

> Configurar Path Alias

- No arquivo de configuração do typescript (tsconfig.json) dentro do objeto CompilerOptions você cria um objeto chamado paths e configura.

```json
{
    "compilerOptions": {
        "paths": {
            "@/*": ["./src/*"]
        }
    }
}
```

> ScrollView vs FlatList

-  **ScrollView:** renderiza todos os seus componentes filhos de reação de uma só vez, mas isso tem uma desvantagem de desempenho.
- **FlatList:** renderiza itens lentamente, quando eles estão prestes a aparecer, e remove itens que rolam para fora da tela para economizar memória e tempo de  processamento.