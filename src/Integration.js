// id da dashboard
const ID_BOARD = "55d5487fb929f379cf626053";
const LIST = "58a5059770795a1522dffe14";
const LISTCHECK = "5653be94f6194a87a4af2beb";

const ARRAY_CHECKLIST = {
    "Padrao": "57a942fc94852c5694a90ddd",
    "ContasPagar": "57ac514241c9d60b6a533b6f",
    "Sexta": "5769eefc20160bef0d28cd37",
    "UptimeAudio": "5769eedb31d19f6f1c33c645",
    "UptimeExercicio": "576b424b37aa976d5baeee5e",
}

const MES = [
    'Janeiro',
    'Feveriro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
];

const NOW = new Date();
const MONTH_NOW = NOW.getMonth();

const trelloApi = new TrelloApi();

let listRoot;


/**
 * Login and fit list checklist
 */
function init() {
    trelloApi.login()
    .then((status) => {
        console.log("Autorizado. Preenchendo dados.");
        // lista eles em um combobox[multiline]
        let inputLists = document.querySelectorAll(".checklists");

        for (let i in ARRAY_CHECKLIST) {
            for (item of inputLists) {
                let option = new Option(i, ARRAY_CHECKLIST[i]);
                item.options.add(option);

                // force selected itens
                if (ARRAY_CHECKLIST[i] === ARRAY_CHECKLIST['Padrao']) {
                    option.selected = true;
                }

                // force selected item friday
                if (item.id.indexOf("friday") != -1 && ARRAY_CHECKLIST[i] === ARRAY_CHECKLIST['Sexta']) {
                    option.selected = true;
                }

                // force selected item second day
                if (item.id.indexOf("two") != -1 && ARRAY_CHECKLIST[i] === ARRAY_CHECKLIST['ContasPagar']) {
                    option.selected = true;
                }

            }
        }
    })
    .catch(() => {
        return console.error('Não foi possível logar.');
    });
}

function logout() {
    trelloApi.logout()
    .then(() => {
        console.log("Deslogado com sucesso!");
        let inputLists = document.querySelectorAll(".checklists");
        
        for (item of inputLists) {
            item.length = 0;
        }

    });
}

function startMakeChecklists() {

    listRoot = new List(MES[NOW.getMonth()], ID_BOARD);

    while (true) {
        let nameCard = NOW.getDate() + "-" + (NOW.getMonth() + 1);

        // Cria a lista
        const cart = new Card(nameCard);

        // cria


        const day = NOW.getDay();
        const date = NOW.getDate();
        NOW.setDate(NOW.getDate() + 1);

        if (NOW.getMonth() != MONTH_NOW) {
            resolve();
            break;
        }
    }
}