import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Person as PersonIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
  Payment as PaymentIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";

type UserData = {
  name: string;
  company: string;
  position: string;
  tariff: {
    name: string;
    features: string[];
    price: string;
    expires: string;
  };
  avatarUrl?: string;
};
const LichiniKabinet = () => {
  // Моковые данные пользователя
  const userData: UserData = {
    name: "Иван Петров",
    company: 'ООО "Технологии Будущего"',
    position: "Frontend разработчик",
    tariff: {
      name: "Профессиональный",
      features: [
        "Неограниченное количество проектов",
        "Доступ к API",
        "Приоритетная поддержка",
        "Расширенная аналитика",
      ],
      price: "2 990 ₽/мес",
      expires: "15.12.2023",
    },
    avatarUrl: "https://i.pravatar.cc/150?img=5",
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", p: 3 }}>
      <Grid container spacing={3}>
        {/* Боковая панель */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Avatar
                src={userData.avatarUrl}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <Typography variant="h6">{userData.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {userData.position}
              </Typography>
            </Box>

            <List>
              <ListItem button>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Профиль" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Компания" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <PaymentIcon />
                </ListItemIcon>
                <ListItemText primary="Тарифы" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Настройки" />
              </ListItem>
              <Divider sx={{ my: 1 }} />
              <ListItem button>
                <ListItemIcon>
                  <ExitToAppIcon color="error" />
                </ListItemIcon>
                <ListItemText primary="Выход" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Основной контент */}
        <Grid item xs={12} md={9}>
          <Typography variant="h4" gutterBottom>
            Личный кабинет
          </Typography>

          <Grid container spacing={3}>
            {/* Информация о пользователе */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <PersonIcon sx={{ mr: 1 }} /> Личная информация
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Полное имя
                    </Typography>
                    <Typography variant="body1">{userData.name}</Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Компания
                    </Typography>
                    <Typography variant="body1">{userData.company}</Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Должность
                    </Typography>
                    <Typography variant="body1">{userData.position}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Информация о тарифе */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <PaymentIcon sx={{ mr: 1 }} /> Тарифный план
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" color="primary">
                      {userData.tariff.name}
                    </Typography>
                    <Typography variant="h5" sx={{ my: 1 }}>
                      {userData.tariff.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Действует до: {userData.tariff.expires}
                    </Typography>
                  </Box>

                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Включено:
                  </Typography>
                  <List dense>
                    {userData.tariff.features.map((feature, index) => (
                      <ListItem key={index} sx={{ py: 0 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <Typography color="primary">•</Typography>
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2, color: "black" }}
                  >
                    Изменить тариф
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LichiniKabinet;
