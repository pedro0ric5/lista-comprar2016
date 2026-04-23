import { supabase } from './supabaseClient.js'

// Recupera o usuário logado. Redireciona para login se não estiver autenticado.
async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) window.location.href = 'login.html'
  return user
}
// Elementos do DOM
const lista = document.getElementById('lista')
const input = document.getElementById('item')

// Carrega a lista de compras do Supabase
async function carregarLista() {
  const { data, error } = await supabase.from('lista_compras').select('*')
  if (error) {
    console.error('Erro ao carregar lista:', error)
    return
  }

  // Limpa a lista e renderiza os itens
  lista.innerHTML = ''
  data.forEach((item) => {
    const li = document.createElement('li')
    li.innerHTML = `${item.item} <button onclick="removerItem('${item.id}')">Remover</button>`
    lista.appendChild(li)
  })
}

// Adiciona novo item Ã  lista de compras
window.adicionarItem = function() {
    const input = document.getElementById('item');
    const texto = input.value.trim();
    
    if (texto === '') {
        showToast('Digite um item antes de adicionar!', 'error');
        return;
    }
    
    const lista = document.getElementById('lista');
    const li = document.createElement('li');
    const itemId = Date.now().toString();
    li.setAttribute('data-id', itemId);
    li.setAttribute('draggable', 'true');
    
    li.innerHTML = `
        <label class="item-checkbox">
            <input type="checkbox" onchange="toggleItem(this, '${escapeHtml(texto)}')">
            <span class="checkmark"></span>
        </label>
        <span class="item-text" onclick="toggleItemFromText(this)">${escapeHtml(texto)}</span>
        <button class="delete-btn" onclick="removerItem(this)" aria-label="Remover item">
            <span class="delete-icon">🗑️</span>
        </button>
    `;
    
    lista.appendChild(li);
    input.value = '';
    
    adicionarEventosDragDrop(li);
    
    // CORREÇÃO: Salva TODOS os itens (incluindo os existentes)
    salvarListaNoStorage();  // Esta linha está correta, o problema está na função abaixo
    
    atualizarEstatisticas();
    showToast('Item adicionado com sucesso!', 'success');
    li.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};