//Dados de exemplo em formato JSON (API futuramente)
const dados = [
    {
      id: 1,
      nome: "Filial SP",
      vendas: 124500,
      meta: 100000,
      status: "acima da meta",
      responsavel: "Ana Silva",
      produtosVendidos: 230,
      dataUltimaVenda: "2025-04-01"
    },
    {
      id: 2,
      nome: "Filial RJ",
      vendas: 98500,
      meta: 100000,
      status: "abaixo da meta",
      responsavel: "Carlos Pereira",
      produtosVendidos: 210,
      dataUltimaVenda: "2025-04-02"
    },
    {
      id: 3,
      nome: "Filial MG",
      vendas: 100000,
      meta: 100000,
      status: "na meta",
      responsavel: "Joana Lopes",
      produtosVendidos: 220,
      dataUltimaVenda: "2025-04-01"
    }
  ];
  
  // Referências aos elementos da tela
  const tbody = document.querySelector("tbody");
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  const closeModalBtn = document.getElementById("closeModal");
  
  // Função para formatar valores em reais
  const formatarMoeda = (valor) => {
    return `R$ ${valor.toLocaleString("pt-BR")}`;
  };
  
  // Renderiza as métricas nos cards
  function atualizarMetricas() {
    const acima = dados.filter(d => d.status === "acima da meta").length;
    const naMeta = dados.filter(d => d.status === "na meta").length;
    const abaixo = dados.filter(d => d.status === "abaixo da meta").length;
  
    document.getElementById("metric-acima").textContent = acima;
    document.getElementById("metric-nameta").textContent = naMeta;
    document.getElementById("metric-abaixo").textContent = abaixo;
  }
  
  // Renderiza a tabela com os dados
  function preencherTabela() {
    dados.forEach(filial => {
      const linha = document.createElement("tr");
      linha.setAttribute("tabindex", "0"); // acessibilidade: foco pelo teclado
  
      linha.innerHTML = `
        <td>${filial.nome}</td>
        <td>${formatarMoeda(filial.vendas)}</td>
        <td>${formatarMoeda(filial.meta)}</td>
        <td>${filial.status}</td>
        <td>${filial.responsavel}</td>
      `;
  
      // Evento de clique ou tecla "Enter" para abrir o modal
      linha.addEventListener("click", () => abrirModal(filial));
      linha.addEventListener("keypress", (e) => {
        if (e.key === "Enter") abrirModal(filial);
      });
  
      tbody.appendChild(linha);
    });
  }
  
  // Função para abrir o modal com os detalhes da filial
 
  function abrirModal(filial) {
    // Limpa o conteúdo do modal antes de adicionar novo conteúdo
    modalBody.innerHTML = `
      <button id="closeModal" aria-label="Fechar modal">&times;</button>
      <h2>Detalhes da Filial</h2>
      <p><strong>Nome:</strong> ${filial.nome}</p>
      <p><strong>Responsável:</strong> ${filial.responsavel}</p>
      <p><strong>Vendas:</strong> ${formatarMoeda(filial.vendas)}</p>
      <p><strong>Meta:</strong> ${formatarMoeda(filial.meta)}</p>
      <p><strong>Status:</strong> ${filial.status}</p>
      <p><strong>Produtos Vendidos:</strong> ${filial.produtosVendidos}</p>
      <p><strong>Última Venda:</strong> ${filial.dataUltimaVenda}</p>
    `;
  
    // Exibe o modal
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
  
    // Reassocia o evento do botão de fechar (pois foi recriado)
    document.getElementById("closeModal").addEventListener("click", fecharModal);
    document.getElementById("closeModal").focus(); // acessibilidade
  

  
    // Injeta conteúdo no modal e exibe
    modalBody.querySelector("h2")?.remove(); // evita duplicação
    modalBody.insertAdjacentHTML("afterbegin", conteudo);
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    closeModalBtn.focus(); // acessibilidade: foca no botão de fechar
  }
  

function fecharModal() {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    modalBody.innerHTML = ""; // garante que todo conteúdo seja limpo
  }
  
  
  // Eventos de fechar modal
  closeModalBtn.addEventListener("click", fecharModal);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharModal();
  });
  
  // Inicializa dashboard
  preencherTabela();
  atualizarMetricas();
  