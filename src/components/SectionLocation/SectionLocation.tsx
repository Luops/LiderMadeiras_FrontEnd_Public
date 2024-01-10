import React from "react";

// Icons
import { FaTruck } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GoClockFill } from "react-icons/go";

// Animations
import { motion } from "framer-motion";

type Props = {};

function SectionLocation({}: Props) {
  return (
    <section id="informacoes" className="w-full py-16">
      <div className="mx-auto px-24 max-[968px]:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Localização e Entregas</h2>
          <p className="text-lg text-gray-600">
            Informações sobre nossa localização e regiões de entrega.
          </p>
        </div>
        {/* Grid - Informações*/}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
          {/*Localização*/}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col justify-start items-center bg-white rounded-lg p-6 shadow-md"
          >
            <div className="relative flex gap-2 items-center justify-center mb-4">
              <i className="max-[374px]:absolute max-[374px]:left-[-30px] max-[340px]:left-[40px] max-[340px]:top-[0px]">
                <FaLocationDot size={25} />
              </i>
              <h3 className="text-2xl font-bold text-center">Nossa Localização</h3>
            </div>
            <p className="text-gray-700 text-center">
              A Lider Madeiras encontra-se no endereço RS-020, 3919 - Neópolis,
              Gravataí - RS, 94100-250.
            </p>
          </motion.div>
          {/*Entregas*/}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col justify-start items-center bg-white rounded-lg p-6 shadow-md"
          >
            <div className="flex gap-2 items-center justify-center mb-4">
              <i>
                <FaTruck size={25} />
              </i>
              <h3 className="text-2xl font-bold">Entregas</h3>
            </div>
            <p className="text-gray-700 text-center">
              Consulte valores e prazos de entrega da sua região.
            </p>
          </motion.div>
          {/*Horario de Funcionamento*/}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`hidden md:block lg:hidden col-span-2 lg:col-span-1 bg-white rounded-lg p-6 max-[968px]:px-4 shadow-md`}
          >
            <div className="relative flex gap-2 items-center justify-center mb-4 max-[466px]:text-center">
              <i className="max-[466px]:absolute max-[466px]:z-1 max-[466px]:left-[70px] max-[466px]:bottom-9">
                <GoClockFill size={25} />
              </i>
              <h3 className="text-2xl font-bold max-[466px]:w-2/3">
                Horário de Funcionamento
              </h3>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-700 text-center">
                De Segunda a Sexta das 08:30h as 12:00h e 13:30h as 18:00h.
              </p>
              <p className="text-gray-700 text-center">
                Sábados e Feriados das 09:00h as 16:00h.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`md:hidden lg:block col-span-1 lg:col-span-2 2xl:col-span-1 bg-white rounded-lg p-6 max-[968px]:px-4 shadow-md`}
          >
            <div className="relative flex gap-2 items-center justify-center mb-4 max-[466px]:text-center">
              <i className="max-[466px]:absolute max-[466px]:z-1 max-[466px]:left-[70px] max-[418px]:left-[45px] max-[466px]:bottom-9 max-[360px]:left-[35px]">
                <GoClockFill size={25} />
              </i>
              <h3 className="text-2xl font-bold max-[466px]:w-2/3">
                Horário de Funcionamento
              </h3>
            </div>
            <div className="flex flex-col">
              <p className="text-gray-700 text-center">
                De Segunda a Sexta das 08:30h as 12:00h e 13:30h as 18:00h.
              </p>
              <p className="text-gray-700 text-center">
                Sábados e Feriados das 09:00h as 16:00h.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default SectionLocation;
