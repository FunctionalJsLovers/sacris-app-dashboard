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
          'http://54.190.9.68:9000/admin/topCategoriesMonth',
        );
        const topCategories = topCategoriesResponse.data.category;

        console.log('Top Categories:', topCategories);

        const artistCategoriesResponse = await axios.get(
          'http://54.190.9.68:9000/admin/artistCategories',
        );
        const artistCategories = artistCategoriesResponse.data.artistCategories;

        console.log('Artist Categories:', artistCategories);

        const categoriesResponse = await axios.get(
          'http://54.190.9.68:9000/admin/categories',
        );
        const categories = categoriesResponse.data.categories;

        console.log('Categories:', categories);

        const mappedChartData = topCategories.map(
          ([count, categoryId]: [number, string]) => {
            console.log(
              'artistCategory for categoryId',
              categoryId,
              ':',
              artistCategories.find((ac: any) => ac.category_id === categoryId),
            );
            const artistCategory = artistCategories.find(
              (ac: any) => ac.category_id === categoryId,
            );
            // Obtener el ID de la categoría, usando artistCategory si está presente, de lo contrario, usar categoryId directamente
            const categoryIdToUse = artistCategory
              ? artistCategory.category_id
              : categoryId;

            // Buscar la categoría en el array de categories
            console.log(
              'category for categoryId',
              categoryIdToUse,
              ':',
              categories.find((c: any) => c.id === categoryIdToUse),
            );

            const category = categories.find(
              (c: any) => c.id === categoryIdToUse,
            );

            // Obtener el nombre de la categoría
            const categoryName = category ? category.name : 'Unknown Category';

            return {
              name: categoryName,
              data: count,
            };
          },
        );

        console.log('Mapped Chart Data:', mappedChartData);

        setChartData(mappedChartData);
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
        text: 'Categorías',
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
          text: 'Horas',
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
