# Entelgy Validator

`npm i ent-validator --save` ou `yarn add ent-validator`

## Como Usar:

adicione `ent-validator` como dependencia, como no exemplo:

```js
AUI().use('ent-validator', function (A) {
  var validator = new A.EntValidator({
    boundingBox '#myForm'
  })
})
```

para detalhes de uso, seguir a documentação do [Alloy Form Validator](https://alloyui.com/tutorials/form-validator) ou a [API](https://alloyui.com/api/classes/A.FormValidator.html)

este Modulo adiciona as seguintes validações:

`bincode`

`birthDate`

`cnpj`

`cpf`

`dateWithFormat`
basta passar o formato usando `/` como delimitador
```
<input class="field-dateWithFormat" date-dateWithFormat="dd/mm/yyyy">
```

`datepicker`
esta validação usará o formato configurado no datepicker

`fileSize`

`fullName`

`hour`

`lessThanCurrentDate`

`mailDomain`

`maxFiles`

`maxYearsOld`

`minYearsOld`

`password`

`pattern`

`requirePieceSet`

`selectMultiple`


Adicionalmente as mensages de erro, assim como as validações podem ser adicionadas ou substituir outras validações de acordo com o projeto:

Para isso, crie um arquivo JS que adicione ao Alloy o modulo: `ent-validator-custom-rules` como no exemplo abaixo:

```js
AUI.add('ent-validator-custom-rules', function (A) {
  A.EntValidatorCustomRules = {
    STRINGS: {
      'required': Liferay.Language.get('my-custom-key-required-message'),
      'some': Liferay.Language.get('my-custom-key-some-message')
    },
    RULES: {
      'some': function(val, node, ruleValue) {
        /* Some Validations */
        return true
      }
    }
  }
},'',{})
```

## Metodos
adicionalmente

`reloadRules`

`isFragmentValid`

## Eventos
O alloy form validator dispara eventos do YUI, ou seja, você precisa do YUI/AUI para ouvi-los

foi adicionado os eventos nativos do dom para determinadas situações:

`validator:validate`

`validator:before`

`validator:after`

`validator:valid`

`validator:reload_rules`

`validator:reset_fields`

`validator:fragment_validate`

Exemplo:

```js
let myInput = document.getElementById('myInput')
myInput.addEventListener('validator:validate', (e) => {
  // do some
}))
```

## Como contribuir

clonar o repositório

instalar as dependencias

`npm i` ou `yarn install`

adicionar e sua IDE o plugin [Editor Config](http://editorconfig.org)



