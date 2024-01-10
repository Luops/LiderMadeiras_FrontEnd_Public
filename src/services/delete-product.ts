import axios from "axios";

// Define a URL da sua API
const API_URL = "https://lidermadeiras-api.onrender.com";

export async function deleteProduct(_id: string) {
  try {
    // Faça uma solicitação GET para a rota de produtos da sua API
    const response = await axios.delete(`${API_URL}/api/product/${_id}`);

    // Verifique se a solicitação foi bem-sucedida
    if (response.status === 204) {
      // Retorne os produtos a partir da resposta da API
      console.log("Produto excluido com sucesso");
    } else {
      // Lida com erros ou retorna um valor padrão, se necessário
      console.error("Erro ao excluir produtos:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Erro ao excluir produtos:", error);
    return null;
  }
}

export async function deleteImage(_id: string) {
  try {
    // Faça uma solicitação GET para a rota de produtos da sua API
    const response = await axios.delete(`${API_URL}/api/image/${_id}`);

    // Verifique se a solicitação foi bem-sucedida
    if (response.status === 204) {
      // Retorne os produtos a partir da resposta da API
      console.log("imagem excluida com sucesso");
    } else {
      // Lida com erros ou retorna um valor padrão, se necessário
      console.error("Erro ao excluir imagem:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Erro ao excluir imagem:", error);
    return null;
  }
}
