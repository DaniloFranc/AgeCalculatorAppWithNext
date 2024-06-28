import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [errorMessage, setErrorMessage] = useState({ day: '', month: '', year: '' });
  const [age, setAge] = useState({ years: '--', months: '--', days: '--' });

  const handleCalculateAge = () => {
    const valueDay = parseInt(day);
    const valueMonth = parseInt(month) - 1;
    const valueYear = parseInt(year);

    const isLeapYear = (valueYear % 4 === 0 && valueYear % 100 !== 0) || valueYear % 400 === 0;
    const maxDaysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (valueMonth < 0 || valueMonth > 11) {
      setErrorMessage({ ...errorMessage, month: 'Must be a valid month' });
    } else if (valueDay < 1 || valueDay > maxDaysInMonth[valueMonth]) {
      setErrorMessage({ ...errorMessage, day: 'Must be a valid date' });
    } else if (valueYear > new Date().getFullYear()) {
      setErrorMessage({ ...errorMessage, year: 'Must be in the past' });
    } else {
      setErrorMessage({ day: '', month: '', year: '' });

      const inputDate = new Date(valueYear, valueMonth, valueDay);
      const today = new Date();

      const differenceInMilliseconds = today - inputDate;
      const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

      const yearDiff = Math.floor(differenceInDays / 365);
      const monthDiff = Math.floor((differenceInDays % 365) / 30);
      const dayDiff = Math.floor((differenceInDays % 365) % 30);

      setAge({ years: yearDiff, months: monthDiff, days: dayDiff });
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend Mentor | Age calculator app</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
        {/* Incluir outros metadados, como favicon, dentro do Head se necessário */}
      </Head>
      <div className={styles.content}>
        <header className={styles.align}>
          <div>
            <div id="textDay" className={styles.texto}>D A Y</div>
            <input
              id="day"
              className={styles.estilo}
              type="text"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
            <span id="errorMessage1" className={styles.align3}>{errorMessage.day}</span>
          </div>
          <div>
            <div id="textMonth" className={styles.texto}>M O N T H</div>
            <input
              id="month"
              className={styles.estilo}
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
            <span id="errorMessage2" className={styles.align3}>{errorMessage.month}</span>
          </div>
          <div>
            <div id="textYear" className={styles.texto}>Y E A R</div>
            <input
              id="year"
              className={styles.estilo}
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <span id="errorMessage3" className={styles.align3}>{errorMessage.year}</span>
          </div>
        </header>
        <div className={styles.alinhar}>
          <hr className={styles['linha-personalizada']} />
          <button id="button" className={styles.botao} onClick={handleCalculateAge}>
            <img src="/icon-arrow.svg" alt="Descrição da imagem" />
          </button>
        </div>
        <div>
          <div className={styles.align4}>
            <div id="displayYear" className={styles.letra2}>{age.years}</div>
            <div className={styles.letra}>years</div>
          </div>
          <div className={styles.align2}>
            <div id="displayMonth" className={styles.letra2}>{age.months}</div>
            <div className={styles.letra}>months</div>
          </div>
          <div className={styles.align5}>
            <div id="displayDay" className={styles.letra2}>{age.days}</div>
            <div className={styles.letra}>days</div>
          </div>
        </div>
      </div>
    </div>
  );
}
