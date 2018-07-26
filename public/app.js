document.addEventListener("DOMContentLoaded", event => {
    var num = new Math.random();
    user = "Guest" + num;
    $('#only').scrollTop($('#only')[0].scrollHeight);
    $('#inputthingie').keydown(function(e) {
        var keycode = e.KeyCode || e.which;
        if(keycode == 13) {
           newPost();
        }
    })
    var user;
    const app = firebase.app();
    const db = firebase.firestore();
    const children = db.collection("messages").orderBy("timestamp", 
"desc").limit(10)
    .onSnapshot(function(querySnapshot) {
        document.getElementById("only").innerHTML = '';
        querySnapshot.forEach((element) => {
            
            data = element.data();
            document.getElementById("only").innerHTML+= '<div class="onesinglemessage">'
            document.getElementById("only").innerHTML+= '<p class="message" id="'+'killmeplsmsg'+'">' + data.message + '</p>';
            document.getElementById("only").innerHTML+= '<p class="sender">,sincerely- ' + data.sender + '</p>'
            document.getElementById("only").innerHTML+= '</div>'
        });
    })

})
$(document).ready(function(){
    $('#sendbuttonthingie').hide();
    $('input').on('change textInput input', function (e) {
        if (e.target.value.length > 0) {
            $('#sendbuttonthingie').fadeIn();
        }
        else {
            $('#sendbuttonthingie').hide();
        }
    })
})
function newPost() {
    $('#sendbuttonthingie').fadeOut(200);
    const db = firebase.firestore();
    if (document.getElementById("inputthingie").value== "") {
        return;
    }


    
    db.collection("messages").add({
        message: ""+document.getElementById("inputthingie").value,
        sender: user,
        timestamp: new Date
    })
    document.getElementById("inputthingie").value = ""; 
}



function googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result => {
        user = result.user.displayName;
    })
    ;
}
function anonymousLogin() {
    firebase.auth().signInAnonymously();
    user = "Anonymous"
}