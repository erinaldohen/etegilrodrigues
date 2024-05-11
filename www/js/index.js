/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

// Pesquisa CEP

function consultaCep(valor) {
    const cep = valor
    console.log(cep);
    
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    fetch('https://viacep.com.br/ws/'+cep+'/json/', options)
    .then(response => response.json())
    .then(data => console.log(data))
    }


    const cep = document.querySelector("#cep")
    const showData = result => {
    for(const campo in result){
        if(document.querySelector("#"+campo)){
            document.querySelector("#"+campo).value = result[campo]
        }
    }
}

cep.addEventListener("blur",(e)=>{
    let search = cep.value.replace("-","") // o método replace procura por um "-" e substitui por ""
    // Como vai acessar domínios diferentes é importante declar o cors
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    fetch(`https://viacep.com.br/ws/${search}/json/`, options) // template string: uso da crase para permitir a utilização de variáveis numa sequência de caracteres
    .then(response => {response.json()
    .then(data => showData(data))
    })
    .catch(e => console.log('Deu Erro: '+ e,message))
})