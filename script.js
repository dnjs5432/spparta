document.addEventListener("DOMContentLoaded", (event) => {
    const buckets = document.querySelectorAll(".bucket");
    buckets.forEach((bucket, index) => {
        const isDone = localStorage.getItem("bucket" + index) === "done";
        if (isDone) {
            bucket.classList.add("done");
        }
    });
});

const buckets = document.querySelectorAll(".bucket");
buckets.forEach((bucket, index) => {
    bucket.addEventListener("click", function () {
        bucket.classList.toggle("done");
        updateLocalStorage();
    });
});

function addItem() {
    const newItem = prompt("추가할 버킷을 입력하세요:");
    if (newItem) {
        const newBucket = document.createElement("div");
        newBucket.className = "bucket center";

        const randomBucketNumber = Math.floor(Math.random() * 3) + 1;
        const imageUrl = `./Bucket0${randomBucketNumber}.png`;
        newBucket.style.backgroundImage = `url(${imageUrl})`;

        newBucket.classList.add(`img${randomBucketNumber}`);

        newBucket.textContent = newItem;
        newBucket.innerHTML += '<button class="delete-btn" onclick="deleteItem(this)">X</button>';

        // 새로운 버킷에 이벤트 리스너를 추가합니다.
        newBucket.addEventListener("click", function () {
            newBucket.classList.toggle("done");

            if (newBucket.classList.contains("done")) {
                localStorage.setItem("bucket" + randomBucketNumber, "done");
            } else {
                localStorage.setItem("bucket" + randomBucketNumber, "");
            }
        });

        document.querySelector(".wrap").appendChild(newBucket);
    }
}

function deleteItem(button) {
    const bucket = button.parentElement;
    bucket.remove();
    updateLocalStorage();
}

function updateLocalStorage() {
    const buckets = document.querySelectorAll(".bucket");
    buckets.forEach((bucket, index) => {
        if (bucket.classList.contains("done")) {
            localStorage.setItem("bucket" + index, "done");
        } else {
            localStorage.removeItem("bucket" + index);
        }
    });
}
