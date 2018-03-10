
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCFvdyOMOYbfr5qNrcZDtMAQ6LrZwV3nXs",
    authDomain: "dj-hack.firebaseapp.com",
    databaseURL: "https://dj-hack.firebaseio.com",
    projectId: "dj-hack",
    storageBucket: "dj-hack.appspot.com",
    messagingSenderId: "61128737185"
  };

  firebase.initializeApp(config);
  const db = firebase.database();
  dbRef = db.ref('/requests');

  function send(result) {
      const id = result.address;
        db.ref('requests/' + id).set({
            data: result.data,
            type: result.type
    });
  };

  function retrieve() {
      dbRef.on("child_added", (snap) => {
        console.log(snap.val());
      });
  }




  function verify(type='success',data){
      retrieve();
    swal({
        title: "Fetching data",
        text: "Recieving encrypted data..",
        imageUrl: '../img/loading.gif',
        timer: 3000,
        showConfirmButton: false,
        },
        function(){
            swal({
                title: "Fetching public key",
                text: "Fetching public key from sender..",
                imageUrl: '../img/loading.gif',
                timer: 3000,
                showConfirmButton: false,
            },
            function(){
                swal({
                title: "Decrypting data",
                text: "Decrypting data using key...",
                imageUrl: '../img/loading.gif',
                timer: 3000,
                showConfirmButton: false,
                },
                function(){
                    if(type == 'success'){
                        swal({
                            title: "Success!",
                            text: "Successfully verified user data...",
                            type: "success",
                        },
                        function(){
                            $('#info_holder').removeClass("hidden");
                            $('#info_holder').addClass("animated bounceInRight");
                        }
                    );
                    }else{
                        swal({
                            title: "Warning!",
                            text: "Data was not verified...",
                            type: "error",
                        });
                    }
                }
                );
            }
            );
        }
    );
    for(key in data){
        let html = `<h4 class="card-title">${key}</h4>
        <p class="card-content">
            ${data[key]}
        </p>
        <br>`;
        $('#verifyinsert').append(html);
    }

}


function addRow(){

    html = `

                                                        <div id="sample" class="row">
                                                            <div class="col-md-4">
                                                                <div class="form-group label-floating">
                                                                    <label class="control-label">Key </label>
                                                                    <input type="text" class="form-control ">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group label-floating">
                                                                    <label class="control-label">Value </label>
                                                                    <input type="text" class="form-control">
                                                                </div>
                                                            </div>
                                                        </div>


`;
    $('#container-rows').append(html);
}

function submit(id){
    address = $('#' + id).val();
    type = id;
    result = {
        'address': address,
        'type': type,
        'data': data,
    }
    send(result);
}

function getTransactions(){
    result = [];
    i = 0;
    txid = localStorage.getItem('transactions').split(",");
    datetime = localStorage.getItem('datetime').split(",");
    txid.forEach(element => {

        let html = `<tr>
        <td><a href="https://rinkeby.etherscan.io/tx/${element}">${element.slice(0,50)+"..."}</a></td>
        <td>${new Date(parseInt((datetime[i]))).toLocaleString()}</td></tr>`;
        $('#tableinsert').append(html);
        i++;
    });
}//getTransaction end

data = {
    'key1': 'value1',
    'key2': 'value1',
    'key3': 'value1',
}//test data for verify display



seed           = bip39.mnemonicToSeed(localStorage.getItem('mnemonic'));
first_acc_path = "m/44'/60'/0'/0/0";
instance       = hdkey.fromMasterSeed(seed);
firstAccount   = instance.derivePath(first_acc_path);

privateKey = firstAccount.getWallet().getPrivateKeyString();
publicKey  = EthCrypto.publicKeyByPrivateKey(privateKey);
address    = EthCrypto.addressByPublicKey(publicKey);




function createData(){
 var transactions = localStorage.getItem("transactions").split(",")
var datetime = localStorage.getItem("datetime").split(",")
    result = {}
    let rows = $('#container-rows').children();
    for(let row of rows){
        let key = row.children[0].children[0].children[1].value;
        let value = row.children[1].children[0].children[1].value;
        result[key] = value;
    }


var hash = sha256(JSON.stringify(result))
var owner_public_key = result["Public_Key"]

EthCrypto.encryptWithPublicKey(result["Public_Key"],JSON.stringify(result)).then(
    data=>{
        Crypto.createDocument(owner_public_key,JSON.stringify(data),hash,function(e,d){
            transactions.push(d);
            datetime.push(String(Date.now()));
localStorage.setItem("datetime",String(datetime))
localStorage.setItem("transactions",String(transactions))
        })
        console.log(data)
    }
)
    console.log(result);
}
/* global $ */



