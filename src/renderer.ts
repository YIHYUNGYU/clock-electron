function updateTime() {
  const clockElement = document.getElementById("clock") as HTMLElement;
  const currentTime = new Date();
  let hours = currentTime.getHours();
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");

  // 24시간제를 12시간제로 변환
  const amPm = hours >= 12 ? "오후" : "오전";
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  if (clockElement) {
    clockElement.innerHTML = `${hours}:${minutes}:${seconds} ${amPm}`;
  } else {
    console.error("Cannot find the clock element in the DOM");
  }
}

const alarmTimeInput = document.getElementById("alarmTime") as HTMLInputElement;
const setAlarmButton = document.getElementById("setAlarm") as HTMLButtonElement;

let alarmTime: string | null = null;

setAlarmButton.addEventListener("click", () => {
  alarmTime = alarmTimeInput.value;
});

function checkAlarm() {
  if (!alarmTime) return;

  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const currentFormattedTime = `${hours}:${minutes}`;

  if (currentFormattedTime === alarmTime) {
    alert("퇴근이다!!");
    alarmTime = null;
  }
}

setInterval(checkAlarm, 1000);

setInterval(updateTime, 1000);
updateTime();
