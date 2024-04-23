// Oyun tahtası, puan ve tahtanın satır ve sütun sayısı
var board;
var score = 0;
var rows = 4;
var columns = 4;

// Sayfa yüklendiğinde çalışacak kodlar
window.onload = function() {
    setGame(); // Oyunu başlat
}

// Oyunu başlatan fonksiyon
function setGame() {
    // Boş bir tahta oluştur
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    // Tahta üzerinde dolaşarak her hücreyi oluştur
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div"); // Yeni bir hücre oluştur
            tile.id = r.toString() + "-" + c.toString(); // Hücrenin id'sini belirle
            let num = board[r][c]; // Hücrenin değerini al
            updateTile(tile, num); // Hücreyi güncelle
            document.getElementById("board").append(tile); // Tahtaya hücreyi ekle
        }
    }
    // Oyuna başlamak için ilk iki '2'yi yerleştir
    setTwo();
    setTwo();
}

// Hücreyi güncelleyen fonksiyon
function updateTile(tile, num) {
    tile.innerText = ""; // Hücrenin içeriğini temizle
    tile.classList.value = ""; // Hücrenin classList'ini temizle
    tile.classList.add("tile"); // Hücreye 'tile' sınıfını ekle
    if (num > 0) { // Eğer hücre boş değilse
        tile.innerText = num.toString(); // Hücreye num değerini ekle
        if (num <= 4096) {
            tile.classList.add("x" + num.toString()); // Hücreye uygun sınıfı ekle
        } else {
            tile.classList.add("x8192"); // 8192 ve üzeri için ayrı sınıfı ekle
        }                
    }
}

// Klavye olaylarını dinleyen fonksiyon
document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") { // Sol ok tuşuna basıldığında
        slideLeft(); // Sola kaydırma işlemini gerçekleştir
        setTwo(); // Yeni bir '2' ekleyerek devam et
    }
    else if (e.code == "ArrowRight") { // Sağ ok tuşuna basıldığında
        slideRight(); // Sağa kaydırma işlemini gerçekleştir
        setTwo(); // Yeni bir '2' ekleyerek devam et
    }
    else if (e.code == "ArrowUp") { // Yukarı ok tuşuna basıldığında
        slideUp(); // Yukarı kaydırma işlemini gerçekleştir
        setTwo(); // Yeni bir '2' ekleyerek devam et
    }
    else if (e.code == "ArrowDown") { // Aşağı ok tuşuna basıldığında
        slideDown(); // Aşağı kaydırma işlemini gerçekleştir
        setTwo(); // Yeni bir '2' ekleyerek devam et
    }
    document.getElementById("score").innerText = score; // Puanı güncelle
})

// Satırı filtreleyen fonksiyon (0 olmayanlar için)
function filterZero(row) {
    return row.filter(num => num != 0); // Sıfırdan farklı olan numaraların olduğu yeni bir dizi oluştur
}

// Satırı kaydıran fonksiyon
function slide(row) {
    row = filterZero(row); // Sıfır olmayanları filtrele
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) { // Ardışık iki sayı aynıysa
            row[i] *= 2; // İki ardışık aynı değer varsa, birini iki katına çıkar
            row[i+1] = 0; // Diğerini sıfıra eşitle
            score += row[i]; // Skora eklenen değeri güncelle
        }
    }
    row = filterZero(row); // Sıfır olmayanları filtrele
    // Sıfır ekleyerek satırı tamamla
    while (row.length < columns) {
        row.push(0);
    }
    return row; // Güncellenmiş satırı döndür
}

// Sola kaydırmayı gerçekleştiren fonksiyon
function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        // Tahtadaki her hücreyi güncelle
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

// Sağa kaydırmayı gerçekleştiren fonksiyon
function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];         
        row.reverse();              
        row = slide(row)            
        board[r] = row.reverse();   
        // Tahtadaki her hücreyi güncelle
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

// Yukarı kaydırmayı gerçekleştiren fonksiyon
function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // Tahtadaki her hücreyi güncelle
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

// Aşağı kaydırmayı gerçekleştiren fonksiyon
function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        // Tahtadaki her hücreyi güncelle
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

// Yerleştirilecek yeni '2'yi belirleyen fonksiyon
function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        // Rasgele bir satır ve sütun bul
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) { // Hücre boşsa
            board[r][c] = 2; // Hücreye '2'yi yerleştir
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2"); // Hücreye uygun sınıfı ekle
            found = true;
        }
    }
}

// Boş bir hücrenin olup olmadığını kontrol eden fonksiyon
function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { // En az bir sıfır varsa
                return true;
            }
        }
    }
    return false;
}
