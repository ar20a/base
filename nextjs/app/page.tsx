"use client";
import dynamic from 'next/dynamic';
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-moment';
import 'chartjs-plugin-zoom';
import Image from "next/image";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
  );
  
  // Dynamically import the Line component from react-chartjs-2
  const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
    ssr: false,
  });
  
  // Create a smoother dataset by generating random values and then averaging them
  function generateData() {
    let data = [];
    let previousValue = Math.random() * 4000000;
    for (let i = 0; i < 365; i++) {
      let newValue = previousValue + (Math.random() - 0.5) * 100000; // Adjust the random step size as needed
      newValue = Math.max(0, newValue); // Ensure value is not negative
      previousValue = newValue;
      data.push(newValue);
    }
    return data;
  }
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
          displayFormats: {
            month: 'MMM YYYY'
          }
        },
        title: {
          display: true,
          text: 'Date'
        },
        grid: {
          drawBorder: false,
          color: 'rgba(255, 255, 255, 0.3)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: 'rgba(255, 255, 255, 0.3)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        }
      }
    },
  };
  
  const now = Date.now();
  const oneYearAgo = now - (365 * 24 * 60 * 60 * 1000);
  const labels = Array.from({ length: 365 }, (_, i) => new Date(oneYearAgo + (i * 24 * 60 * 60 * 1000)));
  
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'TVL',
        data: generateData(),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.2 // This will smooth the line
      },
    ],
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            {/* <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span> */}
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
          {/* <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/app/page.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              YourContract.sol
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p> */}
        </div>

        <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-screen-lg p-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h1 className="text-2xl font-bold text-center mb-6">Liquity (LQTY)</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {/* Data points here */}
            </div>
            <div className="relative h-96">
              <Line options={options} data={data} />
            </div>
          </div>
        </div>
        <div className="space-y-8 w-full max-w-lg">
      <div className="p-6 bg-gray-800 rounded-lg shadow-xl">
          <div className="mb-4 text-center text-xl font-semibold text-white">
            Create Liquidity Trove
          </div>
          <div className="flex justify-between mb-6">
            <button className="flex-1 px-4 py-2 mr-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              BORROW
            </button>
            <button className="flex-1 px-4 py-2 ml-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              LEVERAGE
            </button>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Borrowing lets you deposit and borrow funds in one transaction. All borrowed funds are sent to your account.
          </p>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300">Collateral: (max 0.00)</label>
            <div className="relative flex items-center p-2 bg-gray-700 rounded-lg">
              <Image src="/eth-icon.png" alt="ETH" width={32} height={32} />
              <input type="number" className="w-full ml-2 p-2 bg-transparent text-white focus:outline-none" placeholder="0" />
              <span className="absolute right-3 text-gray-400">~$0</span>
            </div>
            <div className="text-xs text-red-600 text-right mt-1">Required</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Debt: (max 0)</label>
            <div className="relative flex items-center p-2 bg-gray-700 rounded-lg">
              <span className="text-white">$ LUSD</span>
              <input type="number" className="w-full ml-2 p-2 bg-transparent text-white focus:outline-none" placeholder="0" />
            </div>
          </div>
          <div className="text-sm text-gray-400 mt-4">
            Your Trove will be created on your Smart Wallet. This enables the use of advanced features, but may not be compatible with other Liquity frontends. You currently don't have a Smart Wallet and the first, required step in the process will be to create one. 
            <a href="#" className="text-blue-400 hover:text-blue-500 hover:underline">
              Learn more about your Smart Wallet
            </a>
          </div>
        </div>
        </div>
      </main>
      {/* Liquidity Trove Widget */}
      
      
        
    </div>


        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
