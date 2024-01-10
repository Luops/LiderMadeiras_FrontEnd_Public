import axios from "axios";

// Define a URL da sua API
const API_URL = "https://lidermadeiras-api.onrender.com";

// Define a função para buscar todos os produtos
export async function getProducts() {
  try {
    // Faça uma solicitação GET para a rota de produtos da sua API
    const response = await axios.get(`${API_URL}/api/product`);

    // Verifique se a solicitação foi bem-sucedida
    if (response.status === 200) {
      // Retorne os produtos a partir da resposta da API
      return response.data;
    } else {
      // Lida com erros ou retorna um valor padrão, se necessário
      console.error("Erro ao buscar produtos:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return null;
  }
}

export async function getProductsByCategory({ category, isPromotion }: any) {
  try {
    // Monta a URL base para a busca de produtos por categoria
    let url = `${API_URL}/api/product/category/${category}`;

    // Verifica se a opção de promoção foi fornecida
    if (isPromotion !== undefined) {
      url += `?isPromotion=${isPromotion}`;
    }

    // Faz a solicitação GET para a rota de produtos da sua API
    const response = await axios.get(url);

    // Verifique se a solicitação foi bem-sucedida
    if (response.status === 200) {
      // Retorne os produtos a partir da resposta da API
      return response.data;
    } else {
      // Lida com erros ou retorna um valor padrão, se necessário
      console.error("Erro ao buscar produtos:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return null;
  }
}
