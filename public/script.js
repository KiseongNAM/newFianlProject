function getFirstDay(query) {
  if (document.querySelector(query).value == "") {
    alert("날짜를 선택해주세요!");
    return;
  }
  const firstDay = new Date(document.querySelector(query).value);
  const now = new Date();
  const toNow = now.getTime();
  const toFirst = firstDay.getTime();
  const passedTime = toNow - toFirst;
  const passedDay = Math.round(passedTime / (1000 * 60 * 60 * 24));
  let inText = "";
  if (query == ".start-date") {
    inText = "우리 만난지...\u{1F497}";
  } else {
    if (passedDay > 0) {
      inText = "오늘로부터 D +";
    } else {
      inText = "오늘로부터 D";
    }
  }
  let className = query + "-" + "accent";
  document.querySelector(className).innerText = `${inText} ${passedDay}일`;
}

function calcDate(query, day) {
  if (document.querySelector(query).value == "") {
    return;
  }
  let queryStr = String(query);
  queryStr = queryStr.slice(1, queryStr.length);
  const firstDay = new Date(document.querySelector(query).value);
  const toFirst = firstDay.getTime();
  const future = toFirst + day * (1000 * 60 * 60 * 24);
  const someday = new Date(future);
  const year = someday.getFullYear();
  const month = someday.getMonth() + 1;
  const date = someday.getDate();
  const dayString = calcDayString(someday.getDay());
  document.querySelector(
    "#date" + day + queryStr
  ).innerText = `${year}년 ${month}월 ${date}일 ${dayString}요일`;
}

function calcDayString(day) {
  switch (day) {
    case 1:
      return "월";
    case 2:
      return "화";
    case 3:
      return "수";
    case 4:
      return "목";
    case 5:
      return "금";
    case 6:
      return "토";
    case 0:
      return "일";
  }
}

function calcInputDate(query1, query2, num) {
  if (document.querySelector(query1).value == "") {
    return;
  }
  const firstDay = new Date(document.querySelector(query1).value);
  const toFirst = firstDay.getTime();
  const className = String(query2) + num;
  const day = document.querySelector(className).value;
  const future = toFirst + day * (1000 * 60 * 60 * 24);
  const someday = new Date(future);
  const year = someday.getFullYear();
  const month = someday.getMonth() + 1; //월은 +1을 해줘야 정확한 일수가 나온다.
  const date = someday.getDate();
  const dayString = calcDayString(someday.getDay());
  const idName = "#calc-date-text" + num;
  document.querySelector(
    idName
  ).innerText = `${year}년 ${month}월 ${date}일 ${dayString}요일`;
  let err = isNaN(day);
  if (err == true) {
    document.querySelector(idName).innerText = "\u{1F48C}";
  }
}

function checkboxGroup(currentCheckbox) {
  let query = currentCheckbox.classList[2];
  let querySplit = query.split("-")[0];
  let listCheckBoxes = [];
  let queryClass = "." + querySplit + "-" + "form-check";
  for (let i = 1; i < 7; i++) {
    let queryClassNum = queryClass + i;
    listCheckBoxes.push(document.querySelector(queryClassNum));
  }
  let checkedCount = 0;

  let listCheckBoxesLabel = [];
  let queryLabel = "." + querySplit + "-" + "check-label";
  for (let i = 1; i < 7; i++) {
    let queryLabelNum = queryLabel + i;
    listCheckBoxesLabel.push(document.querySelector(queryLabelNum));
  }
  for (let i = 0; i < listCheckBoxes.length; i++) {
    if (listCheckBoxes[i].checked) {
      checkedCount++;
      if (listCheckBoxes[i] !== currentCheckbox) {
        listCheckBoxes[i].checked = false;
      }
    }
  }

  if (checkedCount === 0) {
    currentCheckbox.checked = true;
  }
}

function checkClick(currentText) {
  let query = currentText.classList[2];
  let querySplit = query.split("-")[0];
  let queryNum = query.split("-")[2].slice(-1);
  let queryLabel = "." + querySplit + "-" + "check-label" + queryNum;
  let queryText = document.querySelector(queryLabel).innerHTML;
  document.querySelector(".celeb-date-text").value = queryText;
}

function allOnClick(query) {
  getFirstDay(query);
  calcDate(query, 100);
  calcDate(query, 200);
  calcDate(query, 365);
  calcDate(query, 1095);
  calcDate(query, 1825);
}

function fetchCalcContent(num) {
  document.getElementById("empty-fetch-content").style.display = "none";
  const fetchList = [
    "",
    document.getElementById("fetch-calc-content1"),
    document.getElementById("fetch-calc-content2"),
    document.getElementById("fetch-calc-content3"),
  ];

  const navLinkList = [
    "",
    document.getElementById("nav-link1"),
    document.getElementById("nav-link2"),
    document.getElementById("nav-link3"),
  ];

  let fetchDiv = fetchList[num];
  let navLink = navLinkList[num];

  if (fetchDiv.style.display == "none") {
    fetchDiv.style.display = "block";
    navLink.classList.add("active");
    for (let i = 1; i < 4; i++) {
      if (num == i) {
        continue;
      }
      fetchList[i].style.display = "none";
      navLinkList[i].classList.remove("active");
    }
  }
}

function getWesternAge() {
  if (document.querySelector(".birthday").value == "") {
    alert("날짜를 선택해주세요!");
    return;
  }
  const birthDay = new Date(document.querySelector(".birthday").value);
  const toBirthDay = birthDay.getTime();
  const birth = new Date(toBirthDay);
  const now = new Date();
  let year = now.getFullYear() - birth.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const birthMonth = birth.getMonth() + 1;
  const m = birthMonth - nowMonth;
  if (m > 0 || (m === 0 && now.getDate() < birth.getDate())) {
    year -= 1;
    document.querySelector(
      ".birthday-accent"
    ).innerText = `지금 나이는 \u{1F616} ${year}세`;
  }
  document.querySelector(
    ".birthday-accent"
  ).innerText = `지금 나이는 \u{1F616} ${year}세`;
}
