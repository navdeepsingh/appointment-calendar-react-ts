import Head from "next/head";
import Calendar from "@src/components/Calendar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

const Home = () => (
  <div className="container">
    <Head>
      <title>Appointment Calendar</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <div className="content">
        <Calendar />
      </div>
    </main>

    <footer>      
      Developed by <a href="https://navdeepsingh.in" target="_blank">Navdeep Singh</a>
    </footer>

    <ToastContainer />

    <style>{`
      html,
      body {
        padding: 0;
        margin: 0;
      }

      * {
        box-sizing: border-box;
      }

      .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #eee;
      }

      .content {
        width: 500px;
        height: 500px;        
      }

      main {
        padding: 5rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      footer {
        width: 100%;
        height: 100px;
        border-top: 1px solid #eaeaea;
        text-align: center;
      }

     
      a {
        color: inherit;
        text-decoration: none;
      }

      .title a {
        color: #0070f3;
        text-decoration: none;
      }

      .title a:hover,
      .title a:focus,
      .title a:active {
        text-decoration: underline;
      }

      .title {
        margin: 0;
        line-height: 1.15;
        font-size: 4rem;
      }

      .title,
      .description {
        text-align: center;
      }

      .description {
        line-height: 1.5;
        font-size: 1.5rem;
      }
    `}</style>
  </div>
);

export default Home;
