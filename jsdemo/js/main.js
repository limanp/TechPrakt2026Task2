let arr = [
    {
        "name": "Petro",
        "age": 19,
        "title": "description"
    },
    {
        "name": "Serhii",
        "age": 19,
        "title": "description"
    },
    {
        "name": "Serhii",
        "age": 19,
        "title": "description"
    }, {
        "name": "Serhii",
        "age": 19,
        "title": "description"
    }, {
        "name": "Serhii",
        "age": 19,
        "title": "description"
    },{
        "name": "Serhii",
        "age": 19,
        "title": "description"
    },{
        "name": "Serhii",
        "age": 19,
        "title": "description"
    },{
        "name": "Serhii",
        "age": 19,
        "title": "description"
    },{
        "name": "Serhii",
        "age": 19,
        "title": "description"
    },
];

class UserPanels {
    #userArray;
    #stateArray;
    constructor(userArray) {
        this.#userArray = userArray;
        this.initializeStateArray();
        this.#build();
    }
    initializeStateArray() {
        this.#stateArray = new Array(this.#userArray.length);
        for(let i = 0; i < this.#stateArray.length; i++) {
            this.#stateArray[i] = false;
        }
    }
    saveState() {
        localStorage.setItem('panels-state', JSON.stringify(this.#stateArray));
    }
    loadState() {
        if (localStorage.getItem('panels-state')) {
            try {
                this.#stateArray = JSON.parse(localStorage.getItem('panels-state'));
            }
            catch (exception) {
                this.initializeStateArray();
                this.saveState();
            }
        }
    }
    #createPanel(index) {
        let user = this.#userArray[index];
        let divTag = document.createElement('div');
        divTag.classList.add('user');
        divTag.dataset['id'] = index.toString();
        if (this.#stateArray[index]) {
            divTag.classList.add('selected');
        }
        for (let field in user) {
            let val = user[field];
            let divField = document.createElement('div');
            divField.classList.add(field);
            divField.innerHTML = val;
            divTag.appendChild(divField);
        }
        return divTag;
    }
    #build() {
        this.loadState();
        let containerTag = document.createElement('div');
        for (let i = 0; i < this.#userArray.length; i++) {
            containerTag.appendChild(this.#createPanel(i));
        }
        document.body.appendChild(containerTag);
        document.documentElement.addEventListener('click',
            (event) => {
                let tag = event.target;
                tag = tag.closest('.user');
                if (tag?.classList.contains('user')) {
                    let id = tag.dataset['id'];
                    this.#stateArray[id] =
                        !this.#stateArray[id];
                    this.saveState();
                    tag.classList.toggle('selected');
                }
            });
    }
}
let userPanels = new UserPanels(arr);
