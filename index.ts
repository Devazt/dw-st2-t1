import readlineSync from 'readline-sync';
import fs from 'fs';

// Function saving user data to JSON
function saveUserDataToJSON(){
    const dataToSave = JSON.stringify(userDatabase, null, 2);

    fs.writeFileSync('userDatabase.json', dataToSave);
}

// Function loading user data to JSON
function loadUserDataFromJSON() {
    try {
        const data = fs.readFileSync('userDatabase.json', 'utf8');
        userDatabase.push(...JSON.parse(data));
    } catch (error) {
    }
}

// Interface for user data
interface UserData {
    nama: string;
    umur: number;
    domisili: string;
}

// Array for store user data
const userDatabase: UserData[] = [];

// Create interface for menu option
interface MenuOption {
    label: string;
    action: () => void;
}

// Function for show menu
function showMenu() {    
    console.log("===================================================");
    console.log("List Data:");    
    console.log(userDatabase);
    console.log("===================================================");
    console.log('Pilih Tindakan:');
    const menuOptions: MenuOption[] = [
        { label: 'Tambah Data', action: addData },
        { label: 'Hapus Data', action: deleteData },
        { label: 'Edit Data', action: editData },
        { label: 'Keluar', action: () => process.exit(0) },
    ];

    menuOptions.forEach((option, index) => {
        console.log(`${index + 1}. ${option.label}`);
    });

    const choice = parseInt(readlineSync.question('Masukan pilihan (1-4): '), 10)

    if (choice >= 1 && choice <= 4) {
        menuOptions[choice - 1].action();
    } else {
        console.log("===================================================");
        console.log('Pilihan tidak valid.');
        console.log("===================================================");

        showMenu();
    }
}

// Function for adding user data
function addData() {
    const nama = readlineSync.question('Masukan Nama: ');
    const umur = parseInt(readlineSync.question('Masukan Umur: '));
    const domisili = readlineSync.question('Masukan Domisili: ')

    userDatabase.push({ nama, umur, domisili });
    console.log("===================================================");
    console.log('Data berhasil ditambahkan');
    console.log("===================================================");
    
    saveUserDataToJSON();
    showMenu();
}

// Function for deleting user data
function deleteData() {
    const nama = readlineSync.question('Masukan Nama yang ingin dihapus: ');
    const index = userDatabase.findIndex((user) => user.nama === nama);

    if (index !== -1) {
        userDatabase.splice(index, 1);
        console.log("===================================================");
        console.log('Data berhasil dihapus.');        
        console.log("===================================================");
        saveUserDataToJSON();
    } else {
        console.log("===================================================");
        console.log('Data tidak ditemukan.');
        console.log("===================================================");
    }

    showMenu();
}

// Function for editing user data
function editData() {
    const nama = readlineSync.question('Masukan Nama yang ingin diedit: ');
    const index = userDatabase.findIndex((user) => user.nama === nama);

    if (index !== -1) {
        const newUmur = parseInt(readlineSync.question('Masukan Umur baru: '), 10);
        const newDomsili = readlineSync.question('Masukan Domisili baru: ');

        userDatabase[index].umur = newUmur;
        userDatabase[index].domisili = newDomsili;
        console.log("===================================================");
        console.log('Data berhasil diubah');        
        console.log("===================================================");
        saveUserDataToJSON();
    } else {
        console.log("===================================================");
        console.log('Data tidak ditemukan');        
        console.log("===================================================");
    }

    showMenu();
}

// Function Main
function main() {
    console.log('Selamat Datang!');

    loadUserDataFromJSON();
    
    showMenu();
}

main();