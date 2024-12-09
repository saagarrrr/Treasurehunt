
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { collection, doc, getDocs, getDoc, setDoc, getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const userData = []

const sortedData = {
    data: [

    ],
}

const tempData = {
    data: [

    ],
}

// Initialize Firebase with your project config
const firebaseConfig = {
    apiKey: 'AIzaSyDBD6TFqyiNO2P7xhtSW2etjmYd-1pTTYw',
    authDomain: 'futad-treasure-hunt.firebaseapp.com',
    projectId: 'futad-treasure-hunt',
    storageBucket: 'futad-treasure-hunt.firebasestorage.app',
    messagingSenderId: '415667399840',
    appId: '1:415667399840:web:feebd2e2e1c55bacdb6dc5',
    measurementId: 'G-VVNTDH8E52',
}

const app = initializeApp(firebaseConfig)
// Get a reference to the storage service
const db = getFirestore(app)


const date = new Date()
// const collectionName = ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}
const collectionName = 'user-data'

let Name
let Age
let Email

async function getFireData() {
    const tableBody = document.getElementById('tableBody')
    tableBody.innerHTML = `<div class="header-row">
                <span>Name</span>
                <span>Score</span>
            </div>`  // Clear existing rows

    const querySnapshot = await getDocs(collection(db, collectionName))

    // Fetch user data and store it in an array
    querySnapshot.forEach((docdata) => {
        const data = docdata.data()
        userData.push(data)
    })

    sortedData.data = userData.sort((a, b) => {
        // If 'Score' is missing or undefined, treat it as 0 or a very low number for sorting purposes
        const scoreA = a.Score || 0;
        const scoreB = b.Score || 0;

        return scoreB - scoreA; // Sort in descending order
    });

    // console.log(sortedData);

    // console.log('user data', userData)

    sortedData.data.forEach((user) => {
        const tr = document.createElement('div')
        tr.classList.add('score-row')
        const tdName = document.createElement('span')
        tdName.classList.add('name')
        const tdScore = document.createElement('span')
        tdScore.classList.add('score')


        tdName.innerText = user.Name  // Default to "Player" if name is undefined
        tdScore.innerText = user.Score || '0'  // Default to 0 if score is undefined

        tr.appendChild(tdName)
        tr.appendChild(tdScore)
        tableBody.appendChild(tr)
    })

    let j = 0

}
getFireData()
