import { Router, Request, Response } from 'express';

const home_router = Router();

// Define a página principal:
home_router.get('/', (request: Request, response: Response) => {
  // const api_doc_url =
  //   (process.env.APP_BACKEND_URL
  //     ? process.env.APP_BACKEND_URL
  //     : 'https://trader-dashboard-backend.onrender.com') + '/api_docs';

  // const api_doc_paragraph = `
  //     <p style="margin: 10px; text-align: center; font-size: 24px">
  //       Acesse <a href="${api_doc_url}">${api_doc_url}</a> para ver a
  //       documentação da API.
  //     </p>`;

  const frontend_url = 'https://trader-dashboard-frontend.vercel.app/';

  const html = `
    <div style="display: flex; flex: 1; flex-direction: column; align-items: center; justify-content: center; height: 100%; background-color: #f0f0f0;">
      <p style="margin: 10px; text-align: center; font-size: 24px">
        Servidor online!
      </p>

      <p style="margin: 10px; text-align: center; font-size: 24px">
        Acesse o frontend em <a href="${frontend_url}">${frontend_url}</a>.
      </p>
    </div>
  `;

  return response.send(html);
});

export { home_router };
