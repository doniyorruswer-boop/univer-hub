<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <!-- Brand -->
      <div class="footer-brand">
        <div class="brand-logo-row">
          <img src="/logo-namdtu.jpeg" alt="NamDTU" class="brand-logo-img" />
          <strong>Namangan davlat texnika universiteti</strong>
        </div>
        <p class="brand-motto">{{ t.brandMotto }}</p>
        <div class="social-links">
          <a href="https://t.me/NamDTU_Asosiy" target="_blank" rel="noreferrer" aria-label="Telegram">
            <ion-icon :icon="paperPlaneOutline" />
          </a>
          <a href="https://instagram.com/namdtu.uz" target="_blank" rel="noreferrer" aria-label="Instagram">
            <ion-icon :icon="logoInstagram" />
          </a>
          <a href="https://facebook.com/namdtu" target="_blank" rel="noreferrer" aria-label="Facebook">
            <ion-icon :icon="logoFacebook" />
          </a>
          <a href="https://www.youtube.com/@namdtu_uz" target="_blank" rel="noreferrer" aria-label="YouTube">
            <ion-icon :icon="logoYoutube" />
          </a>
        </div>
      </div>

      <!-- Contacts -->
      <div class="footer-col">
        <h4>{{ t.contactTitle }}</h4>
        <ul>
          <li>
            <ion-icon :icon="locationOutline" class="col-icon" />
            <span>{{ t.contactAddress }}</span>
          </li>
          <li>
            <ion-icon :icon="callOutline" class="col-icon" />
            <a href="tel:+998692341430">(69)-234-14-30</a>
          </li>
          <li>
            <ion-icon :icon="mailOutline" class="col-icon" />
            <a href="mailto:namdtu_info@edu.uz">namdtu_info@edu.uz</a>
          </li>
        </ul>
      </div>

      <!-- University -->
      <div class="footer-col">
        <h4>{{ t.uniTitle }}</h4>
        <ul>
          <li><a href="https://namdtu.uz/about" target="_blank" rel="noreferrer">{{ t.uniAbout }}</a></li>
          <li><a href="https://namdtu.uz/structure" target="_blank" rel="noreferrer">{{ t.uniStructure }}</a></li>
          <li><a href="https://namdtu.uz/management" target="_blank" rel="noreferrer">{{ t.uniManagement }}</a></li>
        </ul>
      </div>

      <!-- Services -->
      <div class="footer-col">
        <h4>{{ t.servicesColTitle }}</h4>
        <ul>
          <li><a href="https://student-elms.namdtu.uz/" target="_blank" rel="noreferrer">{{ t.lmsTitle }}</a></li>
          <li><a href="https://library.namdtu.uz" target="_blank" rel="noreferrer">{{ t.armTitle }}</a></li>
          <li><a href="https://namdtu.uz/services" target="_blank" rel="noreferrer">{{ t.interactiveTitle }}</a></li>
        </ul>
      </div>

      <!-- Documents -->
      <div class="footer-col">
        <h4>{{ t.docsTitle }}</h4>
        <ul>
          <li><a href="https://namdtu.uz/privacy" target="_blank" rel="noreferrer">{{ t.privacyTitle }}</a></li>
          <li><a href="https://namdtu.uz/terms" target="_blank" rel="noreferrer">{{ t.termsTitle }}</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-divider"></div>

    <div class="footer-bottom">
      <p>{{ t.copyright }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import {
  callOutline,
  locationOutline,
  logoFacebook,
  logoInstagram,
  logoYoutube,
  mailOutline,
  paperPlaneOutline,
} from 'ionicons/icons';
import { useLocale } from '../../../composables/useLocale';

defineProps<{
  websiteUrl: string;
}>();

const { t } = useLocale();
</script>

<style scoped>
@import './HomeFooter.css';
</style>