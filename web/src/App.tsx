import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Divider,
} from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface Product {
  id: number;
  name: string;
  url: string;
  selectorWithPrice: string;
  targetPrice: number;
}

interface PriceHistory {
  id: number;
  price: number;
  checkedAt: string;
}

const API = "/api";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [history, setHistory] = useState<PriceHistory[]>([]);

  useEffect(() => {
    fetch(`${API}/products`).then((res) => res.json()).then(setProducts);
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      fetch(`${API}/history/${selectedProduct.id}`)
        .then((res) => res.json())
        .then(setHistory);
    } else {
      setHistory([]);
    }
  }, [selectedProduct]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Watched Products
      </Typography>
      <List>
        {products.map((p) => (
          <ListItem key={p.id} disablePadding>
            <ListItemButton selected={selectedProduct?.id === p.id} onClick={() => setSelectedProduct(p)}>
              <ListItemText primary={p.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 4 }} />
      {selectedProduct && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Price History for {selectedProduct.name}
          </Typography>
          <Paper sx={{ mb: 4, p: 2 }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={history.map(h => ({ ...h, checkedAt: new Date(h.checkedAt).toLocaleString() }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="checkedAt" tick={{ fontSize: 12 }} angle={-30} textAnchor="end" interval={Math.floor(history.length / 10)} />
                <YAxis dataKey="price" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#1976d2" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((h) => (
                  <TableRow key={h.id}>
                    <TableCell>{new Date(h.checkedAt).toLocaleString()}</TableCell>
                    <TableCell>{h.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Container>
  );
}

export default App;
