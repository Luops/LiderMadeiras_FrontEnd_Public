"use client";
import React from "react";

// Services
import { getProductsByCategory } from "@/services/get-products";

// Data
import { categories } from "@/app/data/data";

// Components
import ProductComponent from "@/components/product/ProductComponent";

// Icons
import { FaBars } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";

type Product = {
  _id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  unity: string;
  isPromotion: boolean;
  promoPrice: string;
  url: string;
  file: string;
};

type ListProductsProps = {
  productsParam: Product[]; // Defina o tipo de products como um array de Product
};

const SectionProducts: React.FC<ListProductsProps> = ({ productsParam }) => {
  // State para selecionar o input de promoção
  const [showPromotion, setShowPromotion] = React.useState(false);

  const [productsCategory, setProductsCategory] = React.useState<Product[]>([]);

  // State para selecionar o input de categoria
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );

  // State para a lista de categorias mobile
  const [categoriesMobile, setCategoriesMobile] =
    React.useState<boolean>(false);
  // Função para renderizar o aside
  const toggleCategoriesBar = () => {
    setCategoriesMobile(!categoriesMobile);
  };
  
  // Função para buscar produtos com base nas categorias e na opção de promoção
  const fetchProducts = async () => {
    try {
      let productsData;

      if (selectedCategories.length === 0) {
        // Se nenhuma categoria estiver selecionada, buscar todos os produtos
        productsData = await getProductsByCategory({
          category: "all",
          isPromotion: showPromotion ? "true" : "false",
        });
      } else {
        // Se houver categorias selecionadas, buscar por elas
        productsData = await getProductsByCategory({
          category: selectedCategories,
          isPromotion: showPromotion ? "true" : "false",
        });
      }

      if (productsData) {
        setProductsCategory(productsData);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // Chamada à API ao montar o componente para buscar produtos padrão
  React.useEffect(() => {
    fetchProducts();
    // Configurar o intervalo para atualização a cada 10 minutos
    const interval = setInterval(() => {
      fetchProducts(); // Chamar a função fetchProducts a cada 10 minutos
    }, 5 * 60 * 1000); // 5 minutos em milissegundos

    // Limpar o intervalo quando o componente for desmontado ou atualizado
    return () => clearInterval(interval);
  }, []); // Executa apenas uma vez ao montar o componente

  // Função para manipular a seleção/desseleção das categorias
  const handleCategoryChange = async (category: any) => {
    const { value } = category; // Obtém apenas o valor da categoria selecionada

    let updatedCategories = [];

    // Verifica se a categoria já está selecionada
    if (selectedCategories.includes(value)) {
      // Se já estiver selecionada, remove ela
      updatedCategories = selectedCategories.filter((item) => item !== value);
    } else {
      // Se a categoria não estiver selecionada, verifique se há alguma categoria selecionada atualmente
      // Se houver, remova-a antes de adicionar a nova categoria
      updatedCategories =
        selectedCategories.length > 0
          ? [value]
          : [...selectedCategories, value];
    }

    setSelectedCategories(updatedCategories);

    try {
      let productsData;

      if (!showPromotion) {
        // Se a opção de promoção estiver desativada, buscar produtos de acordo com a categoria selecionada
        if (updatedCategories.length === 0) {
          // Se não houver nenhuma categoria selecionada, buscar todos os produtos
          productsData = await getProductsByCategory({
            category: "all",
            isPromotion: "false",
          });
        } else {
          // Se houver categorias selecionadas, buscar por categoria
          productsData = await getProductsByCategory({
            category: updatedCategories,
            isPromotion: "false",
          });
        }
      } else {
        // Se a opção de promoção estiver ativada, buscar produtos em promoção de acordo com a categoria selecionada
        if (updatedCategories.length === 0) {
          // Se não houver nenhuma categoria selecionada, buscar todos os produtos em promoção
          productsData = await getProductsByCategory({
            category: "all",
            isPromotion: "true",
          });
        } else {
          // Verifica se a opção de promoção foi marcada após a seleção de uma categoria
          // Se sim, mantém a busca pelos produtos selecionados
          const selectedPromotion =
            selectedCategories.length > 0 ? "true" : "false";

          productsData = await getProductsByCategory({
            category: updatedCategories,
            isPromotion: selectedPromotion,
          });
        }
      }

      if (productsData) {
        setProductsCategory(productsData);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // Função para obter o nome da categoria formatado removendo o '_'
  const getCategoryName = (category: string) => {
    return category.replace(/_/g, " ");
  };

  // Função para manipular a seleção/desseleção da opção de promoção
  const handlePromotionChange = async () => {
    const updatedPromotion = !showPromotion;

    setShowPromotion(updatedPromotion);

    try {
      let productsData;

      if (updatedPromotion) {
        if (selectedCategories.length === 0) {
          productsData = await getProductsByCategory({
            category: "all",
            isPromotion: "true",
          });
        } else {
          productsData = await getProductsByCategory({
            category: selectedCategories,
            isPromotion: "true",
          });
        }
      } else {
        // Se a opção de promoção estiver desmarcada
        if (selectedCategories.length === 0) {
          // Se nenhum filtro de categoria estiver selecionado, buscar todos os produtos
          productsData = await getProductsByCategory({
            category: "all",
            isPromotion: "false", // Buscar todos os produtos (em promoção ou não)
          });
        } else {
          // Se houver categorias selecionadas, buscar por elas
          productsData = await getProductsByCategory({
            category: selectedCategories,
            isPromotion: "false", // Buscar todos os produtos (em promoção ou não)
          });
        }
      }
      if (productsData) {
        setProductsCategory(productsData);
      }
    } catch (error: any) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // Observar a resolução do dispositivo e deixar o estado da lista de categorias mobile como false acima de 869px
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 869) {
        setCategoriesMobile(false);
      } else if (window.innerWidth < 870 && categoriesMobile) {
        setCategoriesMobile(true);
      }
    };
    // Verificar a largura da janela quando a página for carregada
    handleResize();

    // Verificar a largura da janela ao redimensionar
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="produtos"
      className="relative w-[87%] max-[940px]:w-[93%] max-[869px]:w-full flex max-[869px]:flex-col items-start justify-between max-[869px]:mb-24"
    >
      {/*Container do botão de filtros em mobile (<= 869px) */}
      <div className="w-full flex z-[41] items-center justify-center min-[870px]:hidden mb-5 pb-2 border-b">
        <button
          onClick={toggleCategoriesBar}
          className="flex items-center justify-center gap-2 z-[41]"
        >
          {categoriesMobile ? (
            <i className="flex items-center justify-center text-center">
              <FaWindowClose
                className="flex items-center justify-center text-center"
                size={30}
              />
            </i>
          ) : (
            <i className="flex items-center justify-center text-center">
              <FaBars
                className="flex items-center justify-center text-center"
                size={30}
              />
            </i>
          )}
          <p>Selecione aqui as categorias que deseja</p>
        </button>
      </div>

      {/*Lista de filtros*/}
      {/*É mobile */}
      <div
        className={`${
          categoriesMobile
            ? "opacity-100 translate-y-0 "
            : "opacity-0 -translate-y-full"
        } absolute min-[870px]:hidden w-[100%] top-[35px] z-[40] flex p-3 gap-4 bg-white bg-gradient-to-r from-[#fe902203] to-orange-50 border-b drop-shadow-[0px_0px_2px_1px_#1b1919b] font-semibold transition-height duration-300 ease-in-out overflow-hidden`}
      >
        {/*Categoria promoção (promoção ou não) */}
        <div className="flex flex-col w-[25%]">
          <h3 className="text-lg font-inder font-bold">Preço</h3>
          <label htmlFor="" className="flex items-center mt-3">
            <input
              type="checkbox"
              checked={showPromotion}
              onChange={handlePromotionChange}
              className="w-4 h-4"
            />
            <span className="text-sm max-[560px]:text-[0.75rem] max-[500px]:text-left text-[#717171] ml-2">
              Em Promoção!
            </span>
          </label>
        </div>
        {/*Categorias (promoção ou não) */}
        <div className="flex flex-col w-[75%]">
          <h3 className="text-lg font-inder font-bold">Categoria</h3>
          <div className="w-full flex flex-wrap gap-3">
            {categories.map((category: any) => (
              <label key={category} className="flex items-center mt-3">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.value)}
                  onChange={() => handleCategoryChange(category)}
                  className="w-4 h-4"
                />
                <span className="text-sm max-[560px]:text-[0.75rem] text-[#717171] ml-2">
                  {category.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/*Não é mobile */}
      {!categoriesMobile && (
        <div className="w-[350px] flex flex-col text-start font-semibold max-[1152px]:ml-3 max-[869px]:hidden">
          {/*Categoria promoção (promoção ou não) */}
          <div className="flex flex-col">
            <h3 className="text-lg font-inder font-bold">Preço</h3>
            <label htmlFor="" className="flex items-center mt-3">
              <input
                type="checkbox"
                checked={showPromotion}
                onChange={handlePromotionChange}
                className="w-4 h-4"
              />
              <span className="text-sm text-[#717171] ml-2">Em Promoção!</span>
            </label>
          </div>
          {/*Categorias (promoção ou não) */}
          <div className="flex flex-col mt-5">
            <h3 className="text-lg font-inder font-bold">Categoria</h3>
            {categories.map((category: any) => (
              <label key={category} className="flex items-center mt-3">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.value)}
                  onChange={() => handleCategoryChange(category)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-[#717171] ml-2">
                  {category.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/*Produtos*/}
      <div className="w-full flex flex-wrap items-center justify-start max-[869px]:justify-center gap-2">
        {/*Container de produtos*/}
        {productsCategory.length !== 0 ? (
          <>
            {productsCategory.map((product: Product) => (
              <ProductComponent key={product._id} {...product} />
            ))}
          </>
        ) : (
          <div className="w-full flex flex-col items-center justify-center mt-10">
            <h3 className="text-lg font-inder font-bold">
              Nenhum resultado de{" "}
              {selectedCategories.map((category) => getCategoryName(category))}{" "}
              encontrado.
            </h3>
          </div>
        )}
      </div>
    </section>
  );
};

export async function getStaticProps() {
  try {
    // Busca os produtos da API durante a construção da página
    const productsData = await getProductsByCategory({
      category: "all",
      isPromotion: "false", // ou "true" se for necessário
    });

    const products = productsData || [];

    return {
      props: {
        products,
      },
      revalidate: 60 * 5, // Revalida a cada 5 minutos
    };
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return {
      props: {
        products: [],
      },
      revalidate: 60 * 5, // Revalida a cada 5 minutos mesmo em caso de erro
    };
  }
}

export default SectionProducts;
