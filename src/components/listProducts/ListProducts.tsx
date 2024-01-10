import React from "react";

// Provider
import UserContext from "@/store/provider";

// Components
import ProductView from "./productView/ProductView";
import ShowProductDetails from "../modals/ShowProductDetails";
import ShowFormEdit from "@/components/modals/ShowFormEdit";

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
  file: File | null;
};

type ListProductsProps = {
  productsParam: Product[]; // Defina o tipo de products como um array de Product
};

const ListProducts: React.FC<ListProductsProps> = ({ productsParam }) => {
  const { products }: any = React.useContext(UserContext);
  const { user }: any = React.useContext(UserContext);

  // State para abrir o modal de detalhes do produto
  const [showDetails, setShowDetails] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null
  );

  // State para carregamento do componente
  const [isLoading, setIsLoading] = React.useState(false);
  const loading = () => {
    if (products.length == 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  };

  // Retornar produtos que sao promoções
  const productsInPromotion = products.filter(
    (product: any) => product.isPromotion
  );

  // Retornar produtos que não sao promoções
  const productsNotInPromotion = products.filter(
    (product: any) => !product.isPromotion
  );

  // Encontre a quantidade máxima de itens na lista de produtos
  const maxItemsProd = Math.max(productsNotInPromotion.length);

  // Defina a altura do contêiner flexível pai com base na altura máxima da lista de produtos
  const calculateHeightProd = () => {
    if (
      maxItemsProd == 1 &&
      (window.innerWidth > 620 || window.innerWidth <= 620)
    ) {
      return `${maxItemsProd * 210}px`;
    } else if (maxItemsProd >= 2 && window.innerWidth > 620) {
      return `${maxItemsProd * 170}px`;
    } else if (maxItemsProd < 1 && window.innerWidth > 620) {
      return "210px";
    } else if (maxItemsProd < 1 && window.innerWidth <= 620) {
      return "240px";
    }
  };

  // Encontre a quantidade máxima de itens na lista de produtos
  const maxItemsPromo = Math.max(productsInPromotion.length);

  // Defina a altura do contêiner flexível pai com base na altura máxima da lista de promoção
  const calculateHeightPromo = () => {
    if (maxItemsPromo == 1 && window.innerWidth > 620) {
      return `${maxItemsPromo * 210}px`;
    } else if (maxItemsPromo == 1 && window.innerWidth <= 620) {
      return `${maxItemsPromo * 250}px`;
    } else if (maxItemsPromo >= 2 && window.innerWidth > 620) {
      return `${maxItemsPromo * 170}px`;
    } else if (maxItemsPromo < 1 && window.innerWidth > 620) {
      return "210px";
    } else if (maxItemsPromo < 1 && window.innerWidth <= 620) {
      return "240px";
    }
  };

  // Altura do contêiner pai com base no número máximo de itens
  const containerHeightProd = calculateHeightProd();

  // Altura do contêiner pai com base no número máximo de itens
  const containerHeightPromo = calculateHeightPromo();

  // Função para recarregar a página
  React.useEffect(() => {
    let unLoadTimeout: NodeJS.Timeout;

    window.addEventListener("beforeunload", () => {
      // Exibir a tela de carregamento com um pequeno atraso
      setIsLoading(true);
      unLoadTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 30000); // Tempo em milissegundos
    });

    window.addEventListener("load", () => {
      clearTimeout(unLoadTimeout); // Limpar o timeout se a página for carregada antes do tempo
      setIsLoading(false);
    });

    return () => {
      window.removeEventListener("beforeunload", () => {
        setIsLoading(true);
      });

      window.removeEventListener("load", () => {
        setIsLoading(false);
      });
    };
  }, []);

  return (
    <>
      {!user ? (
        <>
          <section className="flex items-center justify-center">
            <h1>Por favor, realize o login para acessar o Dashboard.</h1>
          </section>
        </>
      ) : (
        <>
          {/* Mostrar o modal de detalhes do produto */}
          {selectedProduct && (
            <>
              {products.map((product: any) => (
                <ShowProductDetails
                  key={selectedProduct._id}
                  {...selectedProduct}
                  setShowDetails={() => setSelectedProduct(null)}
                />
              ))}
            </>
          )}
          <section className="flex max-[1210px]:flex-col sm:justify-center max-sm:justify-center gap-3 lg:ml-44">
            <article
              className={`flex flex-col w-[500px] max-[620px]:w-[420px] max-[450px]:w-[320px] rounded-[10px_10px_10px_10px] shadow-[5px_3px_20px_-4px_rgba(0,0,0,0.59)]`}
              style={{ height: containerHeightProd }}
            >
              <h3 className="w-100 text-3xl font-bold text-white py-3 text-center rounded-[10px_10px_0px_0px] bg-gradient-to-r from-[#FE9022] to-orange-500">
                Produtos
              </h3>
              {/*Retornar produtos que não sao promoções*/}
              {productsNotInPromotion.length == 0 ? (
                <ProductView
                  _id="Carregando..."
                  title="Carregando..."
                  description="Carregando..."
                  price="Carregando..."
                  category="Carregando..."
                  unity="Carregando..."
                  isPromotion={false}
                  promoPrice="Carregando..."
                  file={null}
                  url="Carregando..."
                  setShowDetails={setShowDetails}
                />
              ) : (
                productsNotInPromotion.map((product: any) => (
                  <ProductView
                    key={product._id}
                    {...product}
                    _id={product._id}
                    setShowDetails={() => setSelectedProduct(product)}
                  />
                ))
              )}
            </article>
            <article
              className={`flex flex-col w-[500px] max-[620px]:w-[420px] max-[450px]:w-[320px] rounded-[10px_10px_10px_10px] shadow-[5px_3px_20px_-4px_rgba(0,0,0,0.59)]`}
              style={{ height: containerHeightPromo }}
            >
              <h3 className="w-100 text-3xl font-bold text-white py-3 text-center rounded-[10px_10px_0px_0px] bg-gradient-to-r from-[#FE9022] to-orange-500">
                Produtos em Promoção
              </h3>
              {/*Retornar produtos que sao promoções*/}
              {productsInPromotion.length == 0 ? (
                <ProductView
                  _id="Carregando..."
                  title="Carregando..."
                  description="Carregando..."
                  price="Carregando..."
                  category="Carregando..."
                  unity="Carregando..."
                  isPromotion={false}
                  promoPrice="Carregando..."
                  file={null}
                  url="Carregando..."
                  setShowDetails={setShowDetails}
                />
              ) : (
                productsInPromotion.map((product: any) => (
                  <ProductView
                    key={product._id}
                    {...product}
                    setShowDetails={() => setSelectedProduct(product)}
                    _id={product._id}
                  />
                ))
              )}
            </article>
          </section>
        </>
      )}
    </>
  );
};

export default ListProducts;
