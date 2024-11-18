import React, { useState, useEffect } from 'react';
import "../../index.css";

export function CompanyDetails({ companyId }) {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await fetch(`http://localhost/escape-desarrollo-backend/public/api/posts/2`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos de la compañía");
        }
        const data = await response.json();
        console.log("Datos de la compañía:", data);
        setCompany(data);
      } catch (error) {
        console.error("Error al cargar los detalles de la compañía:", error);
      }
    };

    fetchCompanyDetails();
  }, [companyId]);

  //console.log("Nombre de la compañía:", company.name);

  if (!company) {
    return <p>Cargando...</p>; 
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <img
          src={company.image}
          alt={company.name}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{company.description}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {company.category} - {company.city}
          </p>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{company.info}</p>
      <div>
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Media</h3>
        {company.media && company.media.length > 0 ? (
          company.media.map((item, index) => (
            <div key={index} className="mt-2">
              {item.type === 'image' ? (
                <img src={item.url} alt={`Media ${index}`} className="w-full h-60 object-cover rounded" />
              ) : (
                <video controls className="w-full h-60 rounded">
                  <source src={item.url} />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400">No media available</p>
        )}
      </div>
    </div>
  );
}
