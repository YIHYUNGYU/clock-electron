class Clock {
  private readonly clockElement: HTMLElement | null;
  private alarmTimeInput: HTMLInputElement;
  private setAlarmButton: HTMLButtonElement;
  private alarmTime: string | null;

  constructor() {
    this.clockElement = document.getElementById("clock");
    this.alarmTimeInput = document.getElementById(
      "alarmTime"
    ) as HTMLInputElement;
    this.setAlarmButton = document.getElementById(
      "setAlarm"
    ) as HTMLButtonElement;
    this.alarmTime = null;
    this.initialize();
  }

  private initialize() {
    this.setAlarmButton.addEventListener("click", () => {
      this.alarmTime = this.alarmTimeInput.value;
      alert("알람이 설정되었습니다.");
    });

    setInterval(() => this.checkAlarm(), 1000);
    setInterval(() => this.updateTime(), 1000);
    this.updateTime();
  }

  private updateTime() {
    const currentTime = new Date();
    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentTime.getSeconds().toString().padStart(2, "0");

    const amPm = hours >= 12 ? "오후" : "오전";
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

    if (this.clockElement) {
      this.clockElement.innerHTML = `${amPm} ${hours}시 ${minutes}분 ${seconds}초`;
    } else {
      console.error("Cannot find the clock element in the DOM");
    }
  }

  private checkAlarm() {
    if (!this.alarmTime) return;

    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const currentFormattedTime = `${hours}:${minutes}`;

    if (currentFormattedTime === this.alarmTime) {
      this.playSoundAndShowAlert().then(() => {
        this.alarmTime = null;
      });
    }
  }

  private async playSoundAndShowAlert() {
    const audio = new Audio("./src/audio/Always.mp3");

    await audio.play();
    await alert("기상!!!");
    await audio.pause();
  }
}

new Clock();
