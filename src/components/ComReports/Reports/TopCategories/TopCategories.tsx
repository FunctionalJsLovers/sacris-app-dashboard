'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import styles from './styles.module.css';
import axios from 'axios';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartDataItem {
  name: string;
  data: number;
}

const TopCategories: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topCategoriesResponse = await axios.get(
          `${apiBaseUrl}/admin/topCategoriesMonth`,
        );
        const topCategories = topCategoriesResponse.data.category;

        const artistCategoriesResponse = await axios.get(
          `${apiBaseUrl}/admin/artistCategories`,
        );
        const artistCategories = artistCategoriesResponse.data.artistCategories;

        const categoriesResponse = await axios.get(
          `${apiBaseUrl}/admin/categories`,
        );
        const categories = categoriesResponse.data.categories;

        const newChartData: ChartDataItem[] = [];

        topCategories.forEach(([count, categoryId]: [number, string]) => {
          const artistCategory = artistCategories.find(
            (ac: any) => ac.id === categoryId,
          );
          if (artistCategory) {
            const category = categories.find(
              (c: any) => c.id === artistCategory.category_id,
            );
            if (category) {
              newChartData.push({
                name: category.name,
                data: count,
              });
            } else {
              console.log(
                'No category found for category_id',
                artistCategory.category_id,
              );
            }
          } else {
            console.log('No artistCategory found for categoryId', categoryId);
          }
        });

        setChartData(newChartData);
        setIsClient(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options: ApexOptions = {
    series: [
      {
        name: 'Aplicaciones',
        data: chartData.map((item) => item.data),
      },
    ],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        colors: ['#000000'],
      },
    },
    theme: {
      mode: 'light',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: '70%',
        distributed: true,
      },
    },
    colors: [
      '#33b2df',
      '#546E7A',
      '#d4526e',
      '#13d8aa',
      '#A5978B',
      '#2b908f',
      '#f9a3a4',
      '#90ee7e',
      '#f48024',
      '#69d2e7',
    ],
    chart: {
      type: 'bar',
      height: 350,
    },
    xaxis: {
      title: {
        text: 'Aplicaciones',
        style: {
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
        },
      },
      categories: chartData.map((item) => item.name),
    },
    yaxis: [
      {
        title: {
          text: 'Categorías',
          style: {
            fontSize: '14px',
            fontFamily: 'Arial, sans-serif',
          },
        },
      },
    ],
    tooltip: {
      style: {
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
      },
      theme: 'dark',
    },
    legend: {
      show: false,
    },
  };

  return (
    <div className={styles.report}>
      <div className={styles.title}>Top categorías</div>
      {isClient && (
        <Chart options={options} series={options.series} type="bar" />
      )}
    </div>
  );
};

export default TopCategories;
