import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  Image,
  ScrollView,
} from 'react-native';

export default function App() {
  // State to manage active tab navigation inside the app
  const [activeTab, setActiveTab] = useState('home');

  const handleContactPress = () => {
    Alert.alert(
      'Get in Touch',
      'Reach out for collaborations, music education programs, web development, or community project discussions in Turkana County.'
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header Profile Summary Bar */}
      <View style={styles.headerBar}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' }}
          style={styles.headerAvatar}
        />
        <View>
          <Text style={styles.headerName}>Samuel Asongo</Text>
          <Text style={styles.headerTitle}>Developer • Artist • Educator</Text>
        </View>
      </View>

      {/* Main Content Area */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {activeTab === 'home' && (
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' }}
                style={styles.avatar}
              />
            </View>

            <Text style={styles.welcome}>WELCOME</Text>
            <Text style={styles.title}>Samuel Asongo</Text>
            <Text style={styles.subtitle}>
              Artist • Music Educator • Full-Stack Developer
            </Text>

            <Text style={styles.description}>
              Welcome to my official portfolio app. I build dynamic full-stack applications, lead community arts initiatives, and empower youth through music and technology.
            </Text>

            <View style={styles.buttonContainer}>
              <Pressable
                style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}
                onPress={() => setActiveTab('portfolio')}
              >
                <Text style={styles.primaryButtonText}>View Projects</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
                onPress={() => setActiveTab('about')}
              >
                <Text style={styles.secondaryButtonText}>About Me</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [styles.outlineButton, pressed && styles.buttonPressed]}
                onPress={handleContactPress}
              >
                <Text style={styles.outlineButtonText}>Contact Me</Text>
              </Pressable>
            </View>
          </View>
        )}

        {activeTab === 'about' && (
          <View style={styles.card}>
            <Text style={styles.sectionHeader}>About Me</Text>
            <Text style={styles.bioText}>
              I am Samuel Asongo, an experienced full-stack web developer proficient in React, Node.js, Express, automated software testing (Playwright), and modern UI design. 
            </Text>
            <Text style={styles.bioText}>
              Alongside technology, I am deeply passionate about the creative arts, music education, and community development. As the founder and lead of local initiatives in Turkana County, I use storytelling, music, and digital tools to foster youth advocacy and positive social impact.
            </Text>

            <Pressable
              style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed, { marginTop: 20 }]}
              onPress={() => setActiveTab('home')}
            >
              <Text style={styles.primaryButtonText}>Back to Home</Text>
            </Pressable>
          </View>
        )}

        {activeTab === 'portfolio' && (
          <View style={styles.card}>
            <Text style={styles.sectionHeader}>Portfolio & Works</Text>
            
            <View style={styles.projectItem}>
              <Text style={styles.projectTitle}>🎨 Creative Voices for Change</Text>
              <Text style={styles.projectDesc}>
                A community development initiative fostering youth advocacy through music, mobile art sessions, storytelling, and public exhibitions.
              </Text>
            </View>

            <View style={styles.projectItem}>
              <Text style={styles.projectTitle}>💻 Full-Stack Web Apps</Text>
              <Text style={styles.projectDesc}>
                Custom responsive web platforms and dynamic mobile dashboards built using React, Express, Node.js, and automated CI/CD workflows.
              </Text>
            </View>

            <View style={styles.projectItem}>
              <Text style={styles.projectTitle}>🎵 Music & Arts Education</Text>
              <Text style={styles.projectDesc}>
                Workshops and training programs leveraging vocal coaching, scriptwriting, and performance arts for regional youth empowerment.
              </Text>
            </View>

            <Pressable
              style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed, { marginTop: 10 }]}
              onPress={() => setActiveTab('home')}
            >
              <Text style={styles.primaryButtonText}>Back to Home</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <Pressable 
          style={[styles.navItem, activeTab === 'home' && styles.navItemActive]} 
          onPress={() => setActiveTab('home')}
        >
          <Text style={[styles.navText, activeTab === 'home' && styles.navTextActive]}>Home</Text>
        </Pressable>

        <Pressable 
          style={[styles.navItem, activeTab === 'about' && styles.navItemActive]} 
          onPress={() => setActiveTab('about')}
        >
          <Text style={[styles.navText, activeTab === 'about' && styles.navTextActive]}>About</Text>
        </Pressable>

        <Pressable 
          style={[styles.navItem, activeTab === 'portfolio' && styles.navItemActive]} 
          onPress={() => setActiveTab('portfolio')}
        >
          <Text style={[styles.navText, activeTab === 'portfolio' && styles.navTextActive]}>Portfolio</Text>
        </Pressable>

        <Pressable 
          style={styles.navItem} 
          onPress={handleContactPress}
        >
          <Text style={styles.navText}>Contact</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },

  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },

  headerAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#2563EB',
  },

  headerName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  headerTitle: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '500',
  },

  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 90,
  },

  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },

  imageContainer: {
    marginBottom: 16,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#2563EB',
    overflow: 'hidden',
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  welcome: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#2563EB',
    marginBottom: 6,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 14,
  },

  description: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },

  sectionHeader: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 15,
    alignSelf: 'flex-start',
  },

  bioText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
    marginBottom: 12,
    textAlign: 'left',
  },

  projectItem: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },

  projectTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },

  projectDesc: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },

  buttonContainer: {
    width: '100%',
    gap: 10,
  },

  primaryButton: {
    width: '100%',
    backgroundColor: '#2563EB',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  secondaryButton: {
    width: '100%',
    backgroundColor: '#0F172A',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  outlineButton: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#2563EB',
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
  },

  outlineButtonText: {
    color: '#2563EB',
    fontSize: 15,
    fontWeight: '700',
  },

  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },

  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingHorizontal: 10,
  },

  navItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  navItemActive: {
    backgroundColor: '#2563EB',
  },

  navText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },

  navTextActive: {
    color: '#FFFFFF',
  },
});