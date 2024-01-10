import axios from "axios";

// Define a URL da sua API
const API_URL = process.env.API_URL;

// Define a função para buscar todos os produtos
export async function putProduct(_id: string, updatedProductData: any) {
  try {
    // Faça uma solicitação PUT para a rota de produtos da sua API
    const response = await axios.put(
      `${API_URL}/api/product/${_id}`,
      updatedProductData, 
    );
    console.log(updatedProductData);

    // Verifique se a solicitação foi bem-sucedida

    if (response.status === 200) {
      // Retorne os produtos a partir da resposta da API
      console.log("Produto atualizado com sucesso");
    } else {
      // Lida com erros ou retorna um valor padrão, se necessário
      console.error("Erro ao atualizar o produto:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Erro ao atualizar o produto:", error);
    return null;
  }
}

// Função para fazer o upload da nova imagem
export async function uploadNewImage(file:any ){
  try {
    // Crie um objeto FormData para enviar o arquivo
    const formData = new FormData();
    formData.append("file", file);

    // Faça uma solicitação POST para a rota de upload de imagem do seu servidor
    const response = await fetch(`${API_URL}/api/image`, {
      method: "POST",
      body: formData,
    });

    if (response.status === 201) {
      // A resposta deve conter a URL da nova imagem
      const data = await response.json();
      if (data.url) {
        // Certifique-se de que a URL da imagem foi retornada
        return data.url;
      } else {
        throw new Error("A resposta não contém a URL da imagem");
      }
    } else {
      // Lida com erros de upload
      throw new Error("Erro ao fazer upload da imagem");
    }
  } catch (error) {
    // Lida com erros de exceção
    throw error;
  }
}
