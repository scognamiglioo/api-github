const user_img = document.querySelector(".user_img");
const userName = document.querySelector(".user_name h1");
const followers_ = document.querySelector(".followers_ span");
const follow_ = document.querySelector(".follow_ span");
const repo_details = document.querySelector(".repo_details");
const btn_submit = document.querySelector(".btn_submit");

let user_name = '';

//para escrever 
function inputFunction() {
    let input_user = document.querySelector(".input_user").value.trim();

    if (input_user.length <= 0) {
        alert("Insira um username do github");
        document.querySelector(".input_user").value = "";
        document.querySelector("input_user").focus();
        return false;
    } else {
        user_name = input_user.split("").join("");
        fetchUser(); // ainda n feita 

        //limpar o box para digitar o prox 
        document.querySelector(".input_user").value = "";
        document.querySelector("input_user").focus();
    }
};

btn_submit.addEventListener("click", function () {
    inputFunction()
});

// quando apertar enter, funcionar como o clique 

document.querySelector(".input_user").addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        //alert("Você pressionou enter");
        inputFunction()
    }
})

//api github

function fetchUser() {
    fetch(`https://api.github.com/users/${user_name}`)
        .then(response => response.json())
        .then(function (data) {
            //console.log(data);
            if (data.message === "Não foi possível encontrar o user.") {
                alert("ERRO! ao encontrar o user.");
                return false;
            } else {
                user_img.innerHTML = `<img src="${data.avatar_url}">`;
                userName.innerHTML = data.login;
                followers_.innerHTML = data.followers;
                follow_.innerHTML = data.following;

            }
        })

    //mostrar repositorios
    fetch(`https://api.github.com/users/${user_name}/repos`)
        .then(response => response.json())
        .then(function (repo_data) {
            console.log(repo_data);
            //caso ainda n tenha repositorios
            if (repo_data.length <= 0) {
                repo_details.innerHTML = `
            
            <div class="item_">
            <div class="repo_name">Sem repositórios :( </div>
            </div>

            `

            } else {
                //quando digitar e o user não tiver nada
                if (repo_data.message == "Não foi possível encontrar repósitorios.") {


                    repo_details.innerHTML = `
            
            <div class="item_">
            <div class="repo_name">dev</div>
            <div class="repo_details_">
              <div class="info_ star">
                <i class="fas fa-star"></i>10
              </div>
              <div class="info_ fork">
                <p><i class="fas fa-code-branch"></i>30</p>
              </div>
              <div class="info_ size">
                <p><i class="fa fa-file"></i>300000</p>
              </div>
            </div>
          </div>
            
            `
                    user_img.innerHTML = `<img src="img/icon.jpg">`;
                    userName.innerHTML = `@username`;
                    followers_.innerHTML = `#`;
                    follow_.innerHTML = `#`;
                } else {
                    let repo_Data = repo_data.map(item => {

                        return (
                            `
                       
            <div class="item_">
            <div class="repo_name">${item.name}</div>
            <div class="repo_details_">
              <div class="info_ star">
                <i class="fas fa-star"></i>${item.watchers}</div>
              <div class="info_ fork">
                <p><i class="fas fa-code-branch"></i>${item.forks}</p>
              </div>
              <div class="info_ size">
                <p><i class="fa fa-file"></i>${item.size}</p>
              </div>
            </div>
          </div>
                    
                    
                    `
                        );
                    })
                    //mostrar numero de repositorios --- 6 por design
                    repo_details.innerHTML = repo_Data.slice(0,6).join("");

                }

            }

        });
}