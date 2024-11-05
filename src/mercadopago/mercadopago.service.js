import { MercadoPagoConfig, Preference } from 'mercadopago';
import express from 'express'
import cors from 'cors'

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN})

const app = express()
const PORT = 3000
app.use(cors('*'))
app.use(express.json())
app.get("/", (req, res) => res.send("Server para pagos online con MercadoPago"))
app.post("/create-preference", async (req, res) => {
  const { title, quantity, unit_price } = req.body
  try {
      const body = {
          items: [
              {
                  title: title,
                  quantity: Number(quantity),
                  unit_price: Number(unit_price),
                  currency_id: 'ARS'
              }
          ],
          // back_urls: {
          //     success: "https:/endpointParaSuccess",
          //     failure: "https:/endpointParaFailure",
          //     pending: "https:/endpointParaPending"
          // },
          // auto_return: "approved"
      }
      const preference = new Preference(client)
      const result = await preference.create({ body })
      res.json({ id: result.id })
    } catch (error) {
      console.error(err.message)
      res.status(500).json({ message: 'Error al crear el pago 😡' })

  }

})
app.listen(PORT, (err) => {
  console.log(err ? `Falla al lanzar el servidor: ${err.message}` : `Servidor corre en http://127.0.0.1:${PORT}`)
})